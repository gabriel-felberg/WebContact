import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/user";
import { createUserServer } from "../../services/user/createUser.server";
import { instanceToPlain } from "class-transformer";

export const createUserController = async(req:Request, res:Response) => {
  const {name, email, telefone, password}:IUserRequest = req.body
  const user = await createUserServer({email, name, telefone, password})
  return res.status(201).json(instanceToPlain(user));
};
