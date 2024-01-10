import express from "express";
import router from "./routers/index.router.js";

const products = new ProductManager("./src/fs/files/products.json");
const users = new UserManager("./src/fs/files/users.json");

const app = express();
const PORT = 8080;

app.use(express.json()).use(express.urlencoded({ extended: true }));

const ready = () => console.log(`server ready on port ${PORT}`);

app.listen(PORT, ready);
