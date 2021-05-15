import { User } from "../models/user";
import { getRepository } from "typeorm";
import { IUserPayload } from "../controllers/user.controller";


export const createUser = async (payload: IUserPayload): Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = new User();
  if (!payload.nickname) return null
  user.nickname = payload.nickname
  return userRepository.save(user);
};