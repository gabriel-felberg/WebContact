import { Request, Response } from "express";
import { IUserContact } from "../../interfaces/contacts";
import { updateContactServer } from "../../services/contact/updateContact.server";

export const updateContactController = async (req: Request, res: Response) => {
  const { name, email, telephone }: IUserContact = req.body;
  const { id } = req.params;
  const user = await updateContactServer({ email, name, telephone }, { id });
  return res.status(203).json(user);
};
