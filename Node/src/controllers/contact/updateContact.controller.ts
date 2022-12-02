import { Request, Response } from "express";
import { IUserContact } from "../../interfaces/contacts";
import { IUserRequest } from "../../interfaces/user";
import { updateContactServer } from "../../services/contact/updateContact.server";

export const updateContactController = async (req:Request, res:Response) => {
  const {name, email, telefone, password}:IUserRequest = req.body
  const {id}= req.params
  const user = await updateContactServer({email, name, telefone, password}, {id})
  return res.status(203).json(user);
};
