import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/user";
import { updateUserServer } from "../../services/user/updateUser.server";

export const updateUserController = async(req:Request, res:Response) => {
  const {name, email, telefone}:IUserRequest = req.body
  const {id}= req.params
  const user = await updateUserServer({email, name, telefone}, {id})
  return res.status(201).json(user);
};