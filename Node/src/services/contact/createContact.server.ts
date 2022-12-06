import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { Email } from "../../entities/email.entity";
import { Telefone } from "../../entities/telefone.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/app.error";
import { IContactId, IUserContact } from "../../interfaces/contacts";

export const createContactServer = async (
  { name, email, telefone }: IUserContact,
  { id }: IContactId
) => {
  const userRepository = AppDataSource.getRepository(User);
  const contactRepository = AppDataSource.getRepository(Contact);
  const emailRepository = AppDataSource.getRepository(Email);
  const telefoneRepository = AppDataSource.getRepository(Telefone);

  const user = await userRepository.findOneBy({ id: id });

  if (!user) {
    throw new AppError("user does not already exists");
  }

  if (typeof email !== typeof telefone) {
    throw new AppError("The field email and telefone must be an array");
  }

  //list and save the email and telefone
  let listEmail: Array<object> = [];
  let listTelefone: Array<object> = [];

  for (let i = 0; i < email.length; i++) {
    if (
      (await emailRepository.findOneBy({ email: email[i] })) &&
      email[i] !== ""
    ) {
      throw new AppError("email already exists");
    }
  }
  for (let i = 0; i < telefone.length; i++) {
    if (
      (await telefoneRepository.findOneBy({ telefone: telefone[i] })) &&
      telefone[i] !== ""
    ) {
      throw new AppError("telefone already exists");
    }
  }
  // const arr = email.map(e => await emailRepository.save({ email: e }))
  for (let i = 0; i < email.length; i++) {
    listEmail.push(await emailRepository.save({ email: email[i] }));
  }
  for (let i = 0; i < telefone.length; i++) {
    listTelefone.push(await telefoneRepository.save({ telefone: telefone[i] }));
  }

  const contact = await contactRepository.save({
    name,
    telefoneContact: listTelefone,
    emailContact: listEmail,
    user_id: user,
  });

  return { contact };
};
