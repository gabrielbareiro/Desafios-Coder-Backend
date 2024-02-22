import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";
const router = Router();

router
  //api
  .use("/api", apiRouter)
  .use("/", viewsRouter);

export default router;
