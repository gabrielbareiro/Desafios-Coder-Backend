import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { log } from "console";
import socketUtils from "./src/utils/socket.utils.js";

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import products from "./src/data/fs/product.Fs.Manager.js";

//server
const server = express();
const PORT = 8080;
const ready = log(`Server ready on port: ${PORT}`);
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", socketUtils);

server
  //views
  .engine("handlebars", engine())
  .set("view engine", "handlebars")
  .set("views", __dirname + "/src/views")

  //middlewares
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static("public"))
  .use(morgan("dev"))

  //endpoints
  .use("/", router)
  .use(errorHandler)
  .use(pathHandler);

export { socketServer };
