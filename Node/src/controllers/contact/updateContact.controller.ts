import { Request, Response } from "express";
import { IUserContact } from "../../interfaces/contacts";

import { updateContactServer } from "../../services/contact/updateContact.server";

export const updateContactController = async (req:Request, res:Response) => {
  const {name, email, telefone}:IUserContact = req.body
  const {id}= req.params
  const user = await updateContactServer({email, name, telefone}, {id})
  return res.status(203).json(user);
};
