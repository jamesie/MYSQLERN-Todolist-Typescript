import { createTodoList, deleteTodoList, renameTodoList } from '../repositories/todolist.repository';
import { Route, Tags, Controller, Post, Request, Body} from "tsoa";
import { myReq } from "../types";
import { TodoList } from "../models/todolist";


export interface ITodoListPayload {
  id: number
  name: string
}

@Route("todolists")
@Tags("TodoList")
export default class TodoListController extends Controller {
  @Post("/create")
  public async createToDoList(@Request() req: myReq, @Body() body: ITodoListPayload): Promise<TodoList> {
    return createTodoList(req, body)
  }
  @Post("/delete")
  public async deleteTodoList(@Request() req: myReq, @Body() body: ITodoListPayload): Promise<boolean> {
    return deleteTodoList(req, body)

  }
  @Post("/rename")
  public async renameTodoList(@Request() req: myReq, @Body() body: ITodoListPayload): Promise<boolean> {
    return renameTodoList(req, body)
  }

}
