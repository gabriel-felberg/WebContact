import { Request, Response } from "express";
import { getContactServer } from "../../services/contact/getContact.server";

export const getContactController = async (req:Request, res:Response) => {
  const contact = await getContactServer()
  return res.status(200).json(contact);
};
