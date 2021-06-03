import { Task } from "../models/task";
import { TodoList } from '../models/todolist';
import { getRepository } from "typeorm";
import { ITaskPayload } from "../controllers/task.controller";
import { myReq } from "../types";
import { User } from "../models/user";

export const createTask = async (req: myReq, body: ITaskPayload): Promise<Task> => {
  const taskRepository = getRepository(Task);
  const task = new Task();
  if (!body.todoListId) throw new Error("TodoListId not specified in JSON");
  const todoList = await getRepository(TodoList).findOne({ id: body.todoListId });
  if (!todoList) throw new Error("TodoListId does not exist");
  if (todoList?.creatorId !== req.session?.userId) throw new Error("Not your todolist");
  if (!req.session?.userId) throw new Error("Not logged in");
  const user = await getRepository(User).findOne({ id: req.session.userId });
  if (!user) throw new Error("Not logged in");
  task.creator = user;
  task.status = false;
  task.taskName = body.taskName;
  task.todoList = todoList;
  if (body.toBeCompletedBy){
    const date = body.toBeCompletedBy // must be recieved in "YYYY-DD-MM"
    date.toString().concat("T00:00:00.000Z")
    task.toBeCompletedBy = body.toBeCompletedBy;
  } 
  const savedTask = await taskRepository.save(task);
  return savedTask;
};

export const deleteTask = async (req: myReq, body: ITaskPayload): Promise<boolean> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne({ id: body.id });
  if (!task) throw new Error("Wrong task Id");
  if (task.creatorId !== req.session?.userId) throw new Error("Not your task");
  await taskRepository.delete({ id: task.id });
  return true;
};

export const editTask = async (req: myReq, body: ITaskPayload): Promise<Task> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne({ id: body.id });
  if (!task) throw new Error("Task does not exist according to our database");
  if (task.creatorId !== req.session?.userId) throw new Error("Not your task");
  if (body.status) task.status = body.status;
  if (body.taskName) task.taskName = body.taskName;
  if (body.toBeCompletedBy) task.toBeCompletedBy = body.toBeCompletedBy;
  await taskRepository.update({ id: task.id }, task);
  return task;
};

