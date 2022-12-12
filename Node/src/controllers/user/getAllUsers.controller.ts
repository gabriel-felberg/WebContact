import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { getUserServer } from "../../services/user/getUser.server";

export const getAllUsersController = async(req: Request, res: Response) => {
  const users = await getUserServer()
  return res.status(200).json(instanceToPlain(users));
};
