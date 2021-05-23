import express from "express";
import TodoListController from '../controllers/todolist.controller';


const TodoListRouter = express.Router();

TodoListRouter.post("/create", async (req, res) => {
  let statusNum = 200
  const controller = new TodoListController();
  const response = await controller.createToDoList(req, req.body).catch((err: Error) => {
    statusNum = 400
    return err.message
  });;
  res.status(statusNum).send(response)
})

TodoListRouter.post("/delete", async (req, res) => {
  let statusNum = 200
  const controller = new TodoListController();
  const response = await controller.deleteTodoList(req, req.body).catch((err: Error) => {
    statusNum = 400
    return err.message
  });;
  res.status(statusNum).send(response)
})

TodoListRouter.post("/rename", async (req, res) => {
  let statusNum = 200
  const controller = new TodoListController();
  const response = await controller.renameTodoList(req, req.body).catch((err: Error) => {
    statusNum = 400
    return err.message
  });;
  res.status(statusNum).send(response)
})


export default TodoListRouter;