import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { Email } from "../../entities/email.entity";
import { Telephone } from "../../entities/telephone.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/app.error";
import { IContactId, IUserContact } from "../../interfaces/contacts";

export const createContactServer = async (
  { name, email, telephone }: IUserContact,
  { id }: IContactId
) => {
  const userRepository = AppDataSource.getRepository(User);
  const contactRepository = AppDataSource.getRepository(Contact);
  const emailRepository = AppDataSource.getRepository(Email);
  const telephoneRepository = AppDataSource.getRepository(Telephone);

  const user = await userRepository.findOneBy({ id: id });

  if (!user) {
    throw new AppError("user does not already exists");
  }

  if (typeof email !== typeof telephone) {
    throw new AppError("The field email and telephone must be an array");
  }

  //list and save the email and telephone
  let listEmail: Array<object> = [];
  let listTelephone: Array<object> = [];

  for (let i = 0; i < email.length; i++) {
    if (
      (await emailRepository.findOneBy({ email: email[i] })) &&
      email[i] !== ""
    ) {
      throw new AppError("email already exists");
    }
  }
  for (let i = 0; i < telephone.length; i++) {
    if (
      (await telephoneRepository.findOneBy({ telephone: telephone[i] })) &&
      telephone[i] !== ""
    ) {
      throw new AppError("telephone already exists");
    }
  }
  // const arr = email.map(e => await emailRepository.save({ email: e }))
  for (let i = 0; i < email.length; i++) {
    listEmail.push(await emailRepository.save({ email: email[i] }));
  }
  for (let i = 0; i < telephone.length; i++) {
    listTelephone.push(
      await telephoneRepository.save({ telephone: telephone[i] })
    );
  }

  const contact = await contactRepository.save({
    name,
    telephoneContact: listTelephone,
    emailContact: listEmail,
    user_id: user,
  });

  return { contact };
};
