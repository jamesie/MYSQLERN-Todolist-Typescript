import { Route, Tags, Post, Controller, Request, Get } from "tsoa";
import {
  createUser,
  deleteAccount,
  login,
  me,
} from "../repositories/user.repository";
import { User } from "../models/user";
import { myReq } from "../types";

export interface IUserPayload {
  username: string;
  password: string;
}

@Route("users")
@Tags("User")
export default class UserController extends Controller {
  @Post("/register")
  public async register(@Request() req: myReq): Promise<User | Error> {
    return createUser(req.body, req.session);
  }

  @Post("/login")
  public async login(@Request() req: myReq): Promise<User> {
    return login(req.body, req.session);
  }

  @Post("/delete")
  public async deleteAccount(@Request() req: myReq): Promise<void> {
    if (!req?.session?.userId) return;
    await deleteAccount(req.session.userId);
    return;
  }

  @Get("/me")
  public async me(@Request() req: myReq): Promise<User> {
    return me(req.session.userId);
  }
}
