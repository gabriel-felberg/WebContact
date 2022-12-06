import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/app.error";
import { IUserLogin } from "../../interfaces/login";

export const loginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.find();

  const userExists = user.find((e) => e.email.find((e) => e.email === email));

  if (!userExists) {
    throw new AppError(
      "should not be able to login with the user with incorrect password or email",
      403
    );
  }

  // console.log(user.find(e => e.email.find(e => console.log(e.email))));
  console.log(email);
  console.log(userExists);
  console.log(userExists.password);
  console.log(password);

  const hashedpassword = await hash(userExists.password, 10);
  const matchPassword = await compare( password, userExists.password);

  console.log(matchPassword, userExists.password, password);
  console.log(hashedpassword);

  if (!matchPassword) {
    throw new AppError("Invalid email or password", 403);
  }

  const token = jwt.sign(
    {
      email: userExists.email,
      userId: userExists.id,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "2h",
    }
  );
  
  return {token, id:userExists.id};
};
