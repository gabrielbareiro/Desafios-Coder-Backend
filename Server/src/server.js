import express from "express";
import ProductManager from "./fs/product.Fs.Manager.js";
import UserManager from "./fs/user.Fs.Manager.js";

const products = new ProductManager("./src/fs/files/products.json");
const users = new UserManager("./src/fs/files/users.json");

const app = express();
const PORT = 8080;

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get("/api/products", async (req, res) => {
    try {
      const dataProducts = await products.read();
      if (dataProducts) {
        console.log("envio productos");
        return res.json(dataProducts);
      } else {
        return res.json({ success: false, message: "not found" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ statusCode: 500, message: error.message });
    }
  })
  .get("/api/users", async (req, res) => {
    try {
      const dataUsers = await users.read();
      if (dataUsers) {
        console.log("envio productos");
        return res.json(dataUsers);
      } else {
        return res.json({ success: false, message: "not found" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ statusCode: 500, message: error.message });
    }
  })
  .get("/api/products/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const dataProducts = await products.readOne(pid);
      if (dataProducts) {
        return res.json(dataProducts);
      } else {
        return res.json({ success: false, message: "not found" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ statusCode: 500, message: error.message });
    }
  })
  .get("/api/users/:uid", async (req, res) => {
    try {
      const { uid } = req.params;
      const dataUsers = await products.readOne(uid);
      if (dataUsers) {
        return res.json(dataUsers);
      } else {
        return res.json({ success: false, message: "not found" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ statusCode: 500, message: error.message });
    }
  });

const ready = () => console.log(`server ready on port ${PORT}`);

app.listen(PORT, ready);
