import { User } from "../models/user";
import { getConnection, getRepository } from "typeorm";
import { IUserPayload } from "../controllers/user.controller";
import argon2 from "argon2";
import { Session, SessionData } from "express-session";
import { myReq } from '../types';

export const createUser = async (
  payload: IUserPayload,
  session: Session & Partial<SessionData> & SessionData
): Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User();
  if (!payload.username) throw new Error("No Username Specificed");
  user.password = await argon2.hash(payload.password);
  user.username = payload.username;
  const savedUser = (await userRepository.save(user).catch((err) => {
    if (err.code === "ER_DUP_ENTRY") {
      throw new Error("Username is taken");
    }
  })) as User;
  session.userId = savedUser.id;
  return savedUser;
};

export const login = async (
  payload: IUserPayload,
  session: Session & Partial<SessionData> & SessionData
): Promise<User> => {
  console.log("callex")
  const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.username = :username", { username: payload.username })
    .getOne();
  if (!user) throw new Error("Incorrect Username or Password"); // incorrect username
  if (!(await argon2.verify(user.password, payload.password)))
    throw new Error("Incorrect Username or Password"); // incorrect password
  session.userId = user.id;
  return user;
};

export const deleteAccount = async (id: number) => {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", { id })
    .execute();
};

export const me = async (req: myReq): Promise<User> => {
  if (!req.session.userId) throw new Error("Not Logged In");
  const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: req.session.userId })
    .getOne();
  if (!user) throw new Error("Not Logged In");
  return user;
};
