import { getConnection, getRepository } from "typeorm";
import { TodoList } from "../models/todolist";
import { User } from "../models/user";
import { myReq } from "../types";
import { ITodoListPayload } from "../controllers/todolist.controller";
import { Task } from "../models/task";

export const createTodoList = async (
  req: myReq,
  body: ITodoListPayload
): Promise<TodoList> => {
  const todoListRepository = getRepository(TodoList);
  const todoList = new TodoList();
  if (!body.name) throw new Error("no todolist name");
  todoList.todoListName = body.name;
  const user = await getRepository(User).findOne({ id: req.session.userId });
  if (!user) throw new Error("not logged in");
  todoList.creator = user;
  const savedTodoList = await todoListRepository.save(todoList);
  return savedTodoList;
};

export const deleteTodoList = async (
  req: myReq,
  body: ITodoListPayload
): Promise<boolean> => {
  const todoList = await getRepository(TodoList).findOne({ id: body.id });
  if (!todoList) {
    throw new Error("Todolist doesn't exist");
  }
  if (todoList.creator.id !== req.session.userId) {
    throw new Error("You dont own this todolist");
  }
  await getRepository(TodoList).delete({ id: todoList.id });
  return true;
};

export const renameTodoList = async (
  req: myReq,
  body: ITodoListPayload
): Promise<boolean> => {
  const todoList = await getRepository(TodoList).findOne({ id: body.id });
  if (!todoList) {
    throw new Error("Todolist doesn't exist");
  }
  if (todoList.creator.id !== req.session.userId) {
    throw new Error("You dont own this todolist");
  }

  await getConnection()
    .createQueryBuilder()
    .update(TodoList)
    .set({
      todoListName: body.name,
    })
    .where("id = :id", { id: todoList.id })
    .execute();

  return true;
};

export const fetchUsersTodoLists = async (
  req: myReq,
  body: ITodoListPayload
): Promise<TodoList[]> => {
  const userRepository = getRepository(User);
  if (!req.session?.userId) throw new Error("Not logged in");
  const user = await userRepository.findOne({ id: req.session.userId });
  if (!user) throw new Error("Not logged in");

  const result = await getRepository(TodoList)
    .createQueryBuilder("todolist")
    .where("todolist.creatorId = :id", { id: user.id });

  if (body.fetchWithTasks) {
    result.leftJoinAndSelect("todolist.tasks", "tasks");
  }

  return await result.getMany();
};

export const fetchTodoListsTasks = async (
  req: myReq,
  body: ITodoListPayload
): Promise<Task[]> => {
  if (!body.id) throw new Error("TodoListId not specified in JSON");
  const todoList = await getRepository(TodoList).findOne({ id: body.id });
  if (!todoList) throw new Error("TodoListId does not exist");
  if (todoList.creatorId !== req.session.userId)
    throw new Error("Not your todolist");

  return await getRepository(Task)
    .createQueryBuilder("task")
    .where("task.todoListId = :id", { id: todoList.id })
    .getMany();
};
