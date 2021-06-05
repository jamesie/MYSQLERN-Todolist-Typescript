import {
  createTodoList,
  deleteTodoList,
  fetchUsersTodoLists,
  renameTodoList,
  fetchTodoListsTaks as fetchTodoListsTasks,
} from "../repositories/todolist.repository";
import { Route, Tags, Controller, Post, Request, Body, Get, Put, Delete } from "tsoa";
import { myReq } from "../types";
import { TodoList } from "../models/todolist";
import { Task } from "../models/task";

export interface ITodoListPayload {
  id: number;
  name: string;
  fetchWithTasks: boolean;
}

@Route("todolists")
@Tags("TodoList")
export default class TodoListController extends Controller {
  @Post("/create")
  public async createToDoList(
    @Request() req: myReq,
    @Body() body: ITodoListPayload
  ): Promise<TodoList> {
    return createTodoList(req, body);
  }
  @Delete("/delete")
  public async deleteTodoList(
    @Request() req: myReq,
    @Body() body: ITodoListPayload
  ): Promise<boolean> {
    return deleteTodoList(req, body);
  }
  @Put("/rename")
  public async renameTodoList(
    @Request() req: myReq,
    @Body() body: ITodoListPayload
  ): Promise<boolean> {
    return renameTodoList(req, body);
  }

  @Get("/fetchuserstodolists")
  public async fetchUsersTodoLists(
    @Request() req: myReq,
    @Body() body: ITodoListPayload
  ): Promise<TodoList[]> {
    return fetchUsersTodoLists(req, body);
  }

  @Get("/fetchtodoliststasks")
  public async fetchTodoListsTasks(
    @Request() req: myReq,
    @Body() body: ITodoListPayload
  ): Promise<Task[]> {
    return fetchTodoListsTasks(req, body);
  }
}
