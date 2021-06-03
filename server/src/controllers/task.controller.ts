import { myReq } from "../types";
import { Route, Tags, Controller, Post, Request, Body, Get } from "tsoa";
import {
  createTask,
  deleteTask,
  editTask,
  fetchIncompletedTasks,
  fetchOverdueTasks,
} from "../repositories/task.repository";
import { Task } from "../models/task";
import { TodoList } from "../models/todolist";

export interface ITaskPayload {
  id: number;
  taskName: string;
  toBeCompletedBy: Date;
  status: boolean;
  todoListId: number;
  currentDate: Date;
}

@Route("task")
@Tags("Task")
export default class TaskController extends Controller {
  @Post("/create")
  public async createTask(
    @Request() req: myReq,
    @Body() body: ITaskPayload
  ): Promise<Task> {
    return createTask(req, body);
  }

  @Post("/delete")
  public async deleteTask(
    @Request() req: myReq,
    @Body() body: ITaskPayload
  ): Promise<boolean> {
    return deleteTask(req, body);
  }

  @Post("/edit")
  public async editTask(
    @Request() req: myReq,
    @Body() body: ITaskPayload
  ): Promise<Task> {
    return editTask(req, body);
  }

  @Get("/inctasks")
  public async fetchIncompletedTasks(
    @Request() req: myReq
  ): Promise<TodoList[]> {
    return fetchIncompletedTasks(req);
  }

  @Get("/fetchoverdue")
  public async fetchOverdueTasks(
    @Request() req: myReq,
    @Body() body: ITaskPayload
  ): Promise<TodoList[]> {
    return fetchOverdueTasks(req, body);
  }
}
