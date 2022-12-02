import AppDataSource from "../../data-source";
import { Email } from "../../entities/email.entity";
import { Telefone } from "../../entities/telefone.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/app.error";
import { IUserId, IUserRequest } from "../../interfaces/user";

export const updateContactServer = async (
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

  // const atual = await userRepository
  //   .createQueryBuilder()
  //   .relation(User, "email")
  //   .of(id)
  //   .loadMany();

  // console.log(atual);
  // console.log(atual);
  // console.log(atual);
  // console.log(atual);

  // await userRepository
  //   .createQueryBuilder()
  //   .relation(User, "email")
  //   .of(email)
  //   .addAndRemove(email, atual);

  // await userRepository
  //   .createQueryBuilder()
  //   .update()
  //   .set({
  //     email: email,
  //     telefone: telefone,
  //     name: name,
  //   })
  //   .where("id = :id", { id: id })
  //   .execute();
  const listEmail = []
  if (email) {
    for (let i = 0; i < UpdateUser.email.length; i++) {
      await userRepository.delete(UpdateUser.email[i].id)
    }
    for (let i = 0; i < email.length; i++) {
      listEmail.push(await emailRepository.save({ email: email[i] }))
    }
  }
  console.log();
  

  const listTelefone = []
  if (telefone) {
    for (let i = 0; i < UpdateUser.telefone.length; i++) {
      await userRepository.delete(UpdateUser.telefone[i].id)
    }
    for (let i = 0; i < telefone.length; i++) {
      listTelefone.push(await telefoneRepository.save({ telefone: telefone[i] }))
    }
  }
  // for (let i = 0; i < email.length; i++) {
  //   await emailRepository.update(UpdateUser.email[i], { email: email[i] });
  // }

  // for (let i = 0; i < telefone.length; i++) {
  //   await telefoneRepository.update(UpdateUser.telefone[i], {
  //     telefone: telefone[i],
  //   });
  // }
  // console.log(UpdateUser.telefone, {
  //   telefone: telefone,
  // });

  // await userRepository.update(id, { name });

  // return { id, name, email, telefone };
  const user = await userRepository.save({ name, telefone:listTelefone, email:listEmail, password });
  return {user}
};
