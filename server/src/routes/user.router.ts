import express from "express";
import { COOKIE_NAME } from "../index";
import UserController from "../controllers/user.controller";
import { myRes, myReq } from '../types';

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  const controller = new UserController();
  const response = await controller.register(req.body);
  if (!response) return res.status(400).send("incorrect inputs")
  if (typeof response === "string") return res.send(response)
  req.session.userId = response.id
  return res.send(response);
});

UserRouter.post("/login", async (req, res) => {
  const controller = new UserController();
  const response = await controller.login(req.body);
  if (!response) return res.status(400).send("incorrect inputs")
  if (typeof response === "string") return res.send(response)
  req.session.userId = response.id
  console.log(req.session)
  return res.send(true);
});

UserRouter.post('/delete', async (req, res) => {
  const controller = new UserController();
  await controller.deleteAccount(req)
  console.log("before" , req.session)
  const cookieStatus = await cookieLogoutorDeleteHandle(req, res)
  console.log("after" , req.session)
  res.send(cookieStatus)
})

UserRouter.post('/logout', async (req, res) => {
  const cookieStatus = await cookieLogoutorDeleteHandle(req, res)
  res.send(cookieStatus)
})

UserRouter.post("/me", async (req, res) => {
  const controller = new UserController();
  const response = await controller.me(req)
  res.send(response)
})

const cookieLogoutorDeleteHandle = (req: myReq, res: myRes) => {
  return new Promise((resolve) => req.session.destroy((err: any) => {
    res.clearCookie(COOKIE_NAME);
    if (err) {
      console.log(err);
      resolve(false);
      return;
    }
    resolve(true);
  }));
}

export default UserRouter;