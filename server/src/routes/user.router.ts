import express from "express";
import UserController from "../controllers/user.controller";
import { cookieLogoutorDeleteHandle } from "../utils/destoryCookie";
import omit from 'just-omit';

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  let statusNum = 200;
  const controller = new UserController();
  let response = await controller.register(req, req.body).catch((err: Error) => {
    statusNum = 400;
    return { error: err.message};
  });
  response = omit(response, ['password'])
  return res.status(statusNum).send(response);
});

UserRouter.post("/login", async (req, res) => {
  console.log(req.body)
  let statusNum = 200;
  const controller = new UserController();
  let response = await controller.login(req, req.body).catch((err: Error) => {
    statusNum = 404;
    return { error: err.message};
  });
  response = omit(response, ['password'])
  return res.status(statusNum).send(response);
});

UserRouter.delete("/delete", async (req, res) => {
  let statusNum = 200;
  const controller = new UserController();
  let response = await controller.login(req, req.body).catch((err: Error) => {
    statusNum = 400;
    return { error: err.message};
  });
  response = omit(response, ['password'])
  return res.status(statusNum).send(response);
});

UserRouter.post("/logout", async (req, res) => {
  const cookieStatus = await cookieLogoutorDeleteHandle(req, res);
  res.send(cookieStatus);
});

UserRouter.get("/me", async (req, res) => {
  let statusNum = 200;
  const controller = new UserController();
  let response = await controller.me(req).catch((err: Error) => {
    statusNum = 404;
    return { error: err.message};
  });
  response = omit(response, ['password'])
  return res.status(statusNum).send(response);
});

export default UserRouter;
