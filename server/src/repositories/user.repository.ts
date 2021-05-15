import { User } from "../models/user";
import { getConnection, getRepository } from "typeorm";
import { IUserPayload } from "../controllers/user.controller";
import argon2 from 'argon2';


export const createUser = async (payload: IUserPayload): Promise<User | string> => {
  const userRepository = getRepository(User);
  const user = new User();
  if (!payload.username) return "no username";
  user.password = await argon2.hash(payload.password)
  user.username = payload.username;
  const savedUser = userRepository.save(user).catch((err) => {
    return err as string
  })
  return savedUser;
};

export const login = async (payload: IUserPayload): Promise<User | string> => {
  const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.username = :username", { username: payload.username })
    .getOne();
  if (!user) return "Incorrect Username or Password" // incorrect username
  if(!(await argon2.verify(user.password, payload.password))) return "Incorrect Username or Password" // incorrect password
  console.log(user)
  return user;
};
