import express from "express";
import UserController from "../controllers/user.controller";

const UserRouter = express.Router();

UserRouter.post("/", async (req, res) => {
  const controller = new UserController();
  const response = await controller.createUser(req.body);
  if (!response) return res.status(400).send("incorrect inputs")
  return res.send(response);
});

export default UserRouter;