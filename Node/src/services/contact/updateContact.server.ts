import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { Email } from "../../entities/email.entity";
import { Telephone } from "../../entities/telephone.entity";
import { AppError } from "../../errors/app.error";
import { IContactId, IUserContact } from "../../interfaces/contacts";

export const updateContactServer = async (
  { name, email, telephone }: IUserContact,
  { id }: IContactId
) => {
  const userRepository = AppDataSource.getRepository(Contact);
  const emailRepository = AppDataSource.getRepository(Email);
  const telephoneRepository = AppDataSource.getRepository(Telephone);

  const UpdateContact = await userRepository.findOneBy({ id });

  if (!UpdateContact) {
    throw new AppError("user not found", 404);
  }
  console.log(UpdateContact);
  console.log(UpdateContact.emailContact[0], { email: email[0] });

  for (let i = 0; i < email.length; i++) {
    await emailRepository.update(UpdateContact.emailContact[i], {
      email: email[i],
    });
  }

  for (let i = 0; i < telephone.length; i++) {
    await telephoneRepository.update(UpdateContact.telephoneContact[i], {
      telephone: telephone[i],
    });
  }
  console.log(UpdateContact);
  await userRepository.update(id, { name });
  console.log(UpdateContact);
  console.log({
    id,
    name,
    emailContact: email,
    telephoneContact: telephone,
    user: UpdateContact.user_id,
  });
  return {
    id,
    name,
    emailContact: email,
    telephoneContact: telephone,
    user: UpdateContact.user_id,
  };
};
