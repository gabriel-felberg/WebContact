import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/user";
import { updateUserServer } from "../../services/user/updateUser.server";

export const updateUserController = async (req: Request, res: Response) => {
  const { name, email, telephone, password }: IUserRequest = req.body;
  const { id } = req.params;
  const user = await updateUserServer(
    { email, name, telephone, password },
    { id }
  );
  return res.status(203).json(instanceToPlain(user));
};
