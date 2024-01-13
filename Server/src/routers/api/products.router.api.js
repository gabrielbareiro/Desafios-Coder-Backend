import { Router } from "express";
import productsManager from "../../fs/files/products.json";

const router = Router();
const products = new productsManager("../../fs/products.Fs.Manager.js");

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.create(data);
    return res.json({ statusCode: 201, response });
  } catch (error) {
    return next(error);
  }
});
get("/", async (req, res, next) => {
  try {
    const all = await products.read();
    return res.json({ statusCode: 200, response: all });
  } catch (error) {
    return next(error);
  }
});
get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.json({ statusCode: 200, response: one });
  } catch (error) {
    return next(error);
  }
});
put("/:pid", async (req, res, next) => {
  const { pid } = req.params;
  const update = products.updateById(pid);
});
export default router;
