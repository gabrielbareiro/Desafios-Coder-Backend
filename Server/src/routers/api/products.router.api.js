import { Router } from "express";
import products from "../../fs/product.Fs.Manager.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";

const router = Router();

router
  .post("/", propsProducts, async (req, res, next) => {
    try {
      const data = req.body;
      const response = await products.create(data);
      return res.json({ statusCode: 201, response });
    } catch (error) {
      return next(error);
    }
  })
  .get("/", async (req, res, next) => {
    try {
      const all = await products.read();
      return res.json({ statusCode: 200, response: all });
    } catch (error) {
      return next(error);
    }
  })
  .get("/:pid", async (req, res, next) => {
    try {
      const { pid } = req.params;
      console.log(pid);
      const one = await products.readOne(pid);
      return res.json({ statusCode: 200, response: one });
    } catch (error) {
      return next(error);
    }
  })
  .put("/:pid", async (req, res, next) => {
    try {
      const {
        body,
        params: { pid },
      } = req;
      const one = await products.update(pid, body);
      return res.json({ statusCode: 200, message: "Updated successfully" });
    } catch (error) {
      return next(error);
    }
  })
  .delete("/:pid", async (req, res, next) => {
    try {
      const { pid } = req.params;
      const one = await products.destroy(pid);
      return res.json({ statusCode: 200, message: "successfully removed" });
    } catch (error) {
      return next(error);
    }
  });
export default router;
