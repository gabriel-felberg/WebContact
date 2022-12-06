import { hash } from "bcryptjs";
import e from "express";
import AppDataSource from "../../data-source";
import { Email } from "../../entities/email.entity";
import { Telefone } from "../../entities/telefone.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/app.error";
import { IUserId, IUserRequest } from "../../interfaces/user";

export const updateUserServer = async (
  { name, email, telefone, password }: IUserRequest,
  { id }: IUserId
) => {
  const userRepository = AppDataSource.getRepository(User);
  const emailRepository = AppDataSource.getRepository(Email);
  const telefoneRepository = AppDataSource.getRepository(Telefone);

  const UpdateUser = await userRepository.findOneBy({ id });

  if (!UpdateUser) {
    throw new AppError("user not found", 404);
  }

  for (let i = 0; i < email.length; i++) {
    await emailRepository.update(UpdateUser.email[i], { email: email[i] });
  }

  for (let i = 0; i < telefone.length; i++) {
    await telefoneRepository.update(UpdateUser.telefone[i], {
      telefone: telefone[i],
    });
  }

  await userRepository.update(id, { name });

  const hashedpassword = await hash(password, 10);
  
  return { id, name, email, telefone, password:hashedpassword, contact:UpdateUser.list_contacts };
};
