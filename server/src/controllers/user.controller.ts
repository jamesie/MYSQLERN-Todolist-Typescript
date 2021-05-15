import { Route, Tags, Post, Body, Controller } from "tsoa";
import { createUser } from '../repositories/user.repository';

export interface IUserPayload {
  nickname: string;
}

@Route("users")
@Tags("User")
export default class UserController extends Controller {
  @Post("/")
  public async createUser(@Body() body: IUserPayload): Promise<any> {
    return createUser(body)
  }
}