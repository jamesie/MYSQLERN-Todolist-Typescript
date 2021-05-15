import { Route, Tags, Post, Body, Controller } from "tsoa";
import { createUser, login } from '../repositories/user.repository';
import { User } from "../models/user";
// import { User } from '../models/user';

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
}