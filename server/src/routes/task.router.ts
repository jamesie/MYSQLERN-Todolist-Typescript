import express from "express";
import TaskController from "../controllers/task.controller";

const TaskRouter = express.Router();

TaskRouter.post("/create", async (req, res) => {
  let statusNum = 200;
  const controller = new TaskController();
  const response = await controller
    .createTask(req, req.body)
    .catch((err: Error) => {
      statusNum = 400;
      return err.message;
    });
  res.status(statusNum).send(response);
});

TaskRouter.post("/delete", async (req, res) => {
  let statusNum = 200;
  const controller = new TaskController();
  const response = await controller
    .deleteTask(req, req.body)
    .catch((err: Error) => {
      statusNum = 400;
      return err.message;
    });
  res.status(statusNum).send(response);
});

TaskRouter.post("/edit", async (req, res) => {
  let statusNum = 200;
  const controller = new TaskController();
  const response = await controller
    .editTask(req, req.body)
    .catch((err: Error) => {
      statusNum = 400;
      return err.message;
    });
  res.status(statusNum).send(response);
});

TaskRouter.get("/inctasks", async (req, res) => {
  let statusNum = 200;
  const controller = new TaskController();
  const response = await controller
    .fetchIncompletedTasks(req)
    .catch((err: Error) => {
      statusNum = 400;
      return err.message;
    });
  res.status(statusNum).send(response);
});

TaskRouter.get("/fetchoverdue", async (req, res) => {
  let statusNum = 200;
  const controller = new TaskController();
  const response = await controller
    .fetchOverdueTasks(req, req.body)
    .catch((err: Error) => {
      statusNum = 400;
      return err.message;
    });
  res.status(statusNum).send(response);
});

export default TaskRouter;
