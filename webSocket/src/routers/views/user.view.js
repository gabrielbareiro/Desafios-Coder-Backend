import { Router } from "express";
import users from "../../data/fs/user.Fs.Manager.js";

const usersRouter = Router();
usersRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("register", {});
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
