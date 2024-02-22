import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./user.view.js";
import products from "../../data/fs/product.Fs.Manager.js";
import users from "../../data/fs/user.Fs.Manager.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const all = await products.read();
    return res.render("index", { products: all });
  } catch (error) {
    next(error);
  }
});
viewsRouter.get("/profile/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const all = await users.readOne(uid);
    console.log(all);
    return res.render("profile", { users: all });
  } catch (error) {
    next(error);
  }
});

viewsRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("register", {});
  } catch (error) {
    next(error);
  }
});
viewsRouter.use("/products", productsRouter);

viewsRouter.use("/users", usersRouter);

export default viewsRouter;
