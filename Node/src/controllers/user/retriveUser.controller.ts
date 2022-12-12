import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { retriveUserServer } from "../../services/user/retriveUser.server";

export const retriveUserController = async(req: Request, res: Response) => {
  const {id}= req.params
  const users = await retriveUserServer({id})
  return res.status(200).json(instanceToPlain(users));
};