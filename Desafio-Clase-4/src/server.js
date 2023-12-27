import express, { urlencoded } from "express";

const server = express();
const PORT = 8080;

server
  .use(express.json())
  .use(urlencoded({ extended: true }))
  .get("/api/products", (req, res) => {});

const ready = () => console.log(`server ready on port ${PORT}`);

server.listen(PORT, ready);
