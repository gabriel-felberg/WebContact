import AppDataSource from "../../data-source";
import { Email } from "../../entities/email.entity";
import { Telefone } from "../../entities/telefone.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/app.error";
import { IUserRequest } from "../../interfaces/user";

export const createUserServer = async ({
  name,
  email,
  telefone
}: IUserRequest) => {
  
  const userRepository = AppDataSource.getRepository(User);
  const emailRepository = AppDataSource.getRepository(Email);
  const telefoneRepository = AppDataSource.getRepository(Telefone);

  const ExistUser = await userRepository.findOneBy({ name });

  if (ExistUser) {
    throw new AppError("user already exists");
  }

  if (typeof email !== typeof telefone) {
    throw new AppError("The field email and telefone must be an array");
  }
  let listEmail:Array<object> = []
  for (let i = 0; i < email.length; i++) {
    if (await emailRepository.findOneBy({ email:email[i] })) {
      throw new AppError("email already exists");
    }else{
      listEmail.push(await emailRepository.save({ email: email[i] }))
    }
  }
  let listTelefone:Array<object> = []
  for (let i = 0; i < telefone.length; i++) {
    if (await telefoneRepository.findOneBy({ telefone:telefone[i] })) {
      throw new AppError("telefone already exists");
    }else{
      listTelefone.push(await telefoneRepository.save({ telefone: telefone[i] }))
    }
  }
  const user = await userRepository.save({ name, telefone:listTelefone, email:listEmail });
  return {user}
};