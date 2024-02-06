import express from "express";
import router from "./routers/index.router.js";
import errorHandler from "./middlewares/errorHandler.mid.js";
import pathHandler from "./middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";

const app = express();
const PORT = 8080;

//midlewares

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(__dirname + "/public"))
  .use(morgan("dev"))
  .use("/", router)
  .use(errorHandler)
  .use(pathHandler);

const ready = () => console.log(`server ready on port ${PORT}`);

app.listen(PORT, ready);
