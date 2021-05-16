import { Route, Tags, Post, Body, Controller, Request, Get } from "tsoa";
import { createUser, deleteAccount, login, me } from '../repositories/user.repository';
import { User } from "../models/user";
import { myReq } from '../types';

export interface IUserPayload {
  username: string;
  password: string;
}

@Route("users")
@Tags("User")
export default class UserController extends Controller {
  @Post("/register")
  public async register(@Body() body: IUserPayload): Promise<User | string> {
    return createUser(body)
  }

  @Post("/login")
  public async login(@Body() body: IUserPayload): Promise<User | string> {
    return login(body)
  }

  @Post("/delete")
  public async deleteAccount(@Request() req: myReq): Promise<void> {
    if (!req?.session?.userId) return
    await deleteAccount(req.session.userId)
    return
  }

  @Get("/me")
  public async me(@Request() req: myReq): Promise<User | null> {
    if (!req?.session?.userId) return null
    const meInfo = await me(req.session.userId)
    if (!meInfo) return null
    return meInfo
  }

}
