import express from "express";
import UserController from "../controllers/user.controller";

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
  return res.send(true);
});

export default UserRouter;