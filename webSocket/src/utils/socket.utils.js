import { socketServer } from "../../server.js";

import products from "../data/fs/product.Fs.Manager.js";
import propsProduct from "./propsProducts.utils.js";

export default async (socket) => {
  console.log(`Client: ${socket.id} connected`);
  socket.emit("products", await products.read());

  socket.on("newProduct", async (data) => {
    try {
      propsProduct(data);
      console.log(data);
      await products.create(data);
      socketServer.emit("products", await products.read());
    } catch (error) {
      console.log(error);
      socketServer.emit("error", "All fields are require");
    }
  });
};
