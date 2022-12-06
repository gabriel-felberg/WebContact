import { Request, Response } from "express";
import { IUserContact } from "../../interfaces/contacts";
import { createContactServer } from "../../services/contact/createContact.server";

export const createContactController = async (req:Request, res:Response) => {
  const {name, email, telefone}:IUserContact = req.body
  const {id} = req.user
  const contact = await createContactServer({email, name, telefone}, {id})
  return res.status(201).json(contact);
};
