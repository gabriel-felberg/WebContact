import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Email } from "../../entities/email.entity";
import { Telephone } from "../../entities/telephone.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/app.error";
import { IUserId, IUserRequest } from "../../interfaces/user";

export const updateUserServer = async (
  { name, email, telephone, password }: IUserRequest,
  { id }: IUserId
) => {
  const userRepository = AppDataSource.getRepository(User);
  const emailRepository = AppDataSource.getRepository(Email);
  const telephoneRepository = AppDataSource.getRepository(Telephone);

  const UpdateUser = await userRepository.findOneBy({ id });

  if (!UpdateUser) {
    throw new AppError("user not found", 404);
  }

  for (let i = 0; i < email.length; i++) {
    await emailRepository.update(UpdateUser.email[i], { email: email[i] });
  }

  for (let i = 0; i < telephone.length; i++) {
    await telephoneRepository.update(UpdateUser.telephone[i], {
      telephone: telephone[i],
    });
  }

  await userRepository.update(id, { name });

  const hashedpassword = await hash(password, 10);

  return {
    id,
    name,
    email,
    telephone,
    password: hashedpassword,
    contact: UpdateUser.list_contacts,
  };
};
