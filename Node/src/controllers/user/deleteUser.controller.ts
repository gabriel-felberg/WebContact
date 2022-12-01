import { Request, Response } from "express";
import { deleteUserServer } from "../../services/user/deleteUser.server";

export const deleteUserController = async(req: Request, res: Response) => {
  const {id}= req.params
  await deleteUserServer({id})
  console.log(id);
  return res.status(203).send()
};
