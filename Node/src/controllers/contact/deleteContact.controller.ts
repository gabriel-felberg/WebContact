import { Request, Response } from "express";
import { deleteContactServer } from "../../services/contact/deleteContact.server";

export const deleteContactController = async (req:Request, res:Response) => {
  const {id} = req.params
  const contact = await deleteContactServer({id})
  return res.status(204).json(contact);
};
