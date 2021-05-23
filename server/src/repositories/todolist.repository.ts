import { getConnection, getRepository } from "typeorm";
import { TodoList } from "../models/todolist";
import { User } from "../models/user";
import { myReq } from '../types';
import { ITodoListPayload } from '../controllers/todolist.controller';

export const createTodoList = async (req: myReq, body: ITodoListPayload): Promise<TodoList> => {
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

export const deleteTodoList = async (req: myReq, body: ITodoListPayload): Promise<boolean> => {
  const todoList = await getRepository(TodoList).findOne({id: body.id})
  if (!todoList){
    throw new Error("Todolist doesn't exist")
  }
  if (todoList.creator.id !== req.session.userId){
    throw new Error("You dont own this todolist")
  }
  await getRepository(TodoList).delete({id: todoList.id})
  return true
}

export const renameTodoList = async (req: myReq, body: ITodoListPayload): Promise<boolean> => {
  const todoList = await getRepository(TodoList).findOne({id: body.id})
  if (!todoList){
    throw new Error("Todolist doesn't exist")
  }
  if (todoList.creator.id !== req.session.userId){
    throw new Error("You dont own this todolist")
  }

  await getConnection()
    .createQueryBuilder()
    .update(TodoList)
    .set({ 
        todoListName: body.name
    })
    .where("id = :id", { id: todoList.id })
    .execute();
    
  return true
}