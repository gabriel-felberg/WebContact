import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/user";
import { createUserServer } from "../../services/user/createUser.server";

export const createUserController = async(req:Request, res:Response) => {
  const {name, email, telefone}:IUserRequest = req.body
  const user = await createUserServer({email, name, telefone})
  return res.status(201).json(user);
};
