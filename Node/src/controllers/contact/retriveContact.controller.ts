import { Request, Response } from "express";
import { retriveContactServer } from "../../services/contact/retriveContact.server";

export const retriveContactController = async (req:Request, res:Response) => {
  const {id} = req.params
  const contact = await retriveContactServer({id})
  return res.status(200).json(contact);
};
