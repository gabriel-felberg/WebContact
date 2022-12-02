import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { IUserId } from "../../interfaces/user";

export const retriveContactServer = async ({id}:IUserId) => {
  const userRepository = AppDataSource.getRepository(Contact);
  const ExistUser = await userRepository.findOne({where:{id}, relations:{user_id:true}});
  return ExistUser;
};
