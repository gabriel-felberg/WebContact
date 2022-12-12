import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Email } from "../../entities/email.entity";
import { Telephone } from "../../entities/telephone.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/app.error";
import { IUserRequest } from "../../interfaces/user";

export const createUserServer = async ({
  name,
  email,
  telephone,
  password,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const emailRepository = AppDataSource.getRepository(Email);
  const telephoneRepository = AppDataSource.getRepository(Telephone);

  const ExistUser = await userRepository.findOneBy({ name });

  if (ExistUser) {
    throw new AppError("user already exists");
  }

  if (typeof email !== typeof telephone) {
    throw new AppError("The field email and telephone must be an array");
  }
  //list and save the email and telephone
  let listEmail = [];
  let listTelephone = [];

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
  for (let i = 0; i < email.length; i++) {
    listEmail.push(await emailRepository.save({ email: email[i] }));
  }
  for (let i = 0; i < telephone.length; i++) {
    listTelephone.push(
      await telephoneRepository.save({ telephone: telephone[i] })
    );
  }

  const hashedpassword = await hash(password, 10);
  const user = await userRepository.save({
    name,
    telephone: listTelephone,
    email: listEmail,
    password: hashedpassword,
  });
  return { user };
};
