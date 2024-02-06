import { Router, response } from "express";
import orders from "../../fs/order.Fs.Manager.js";

const router = Router();

router
  .post("/", async (req, res, next) => {
    try {
      const { uid } = req.query;
      console.log(uid);
      const response = await orders.create(uid);
      return res.json({ statusCode: 201, response });
    } catch (error) {
      return next(error);
    }
  })
  .get("/", async (req, res, next) => {
    try {
      const all = await orders.read();
      return res.json({ statusCode: 200, response: all });
    } catch (error) {
      return next(error);
    }
  })
  .get("/oid", async (req, res, next) => {
    try {
      const { oid } = req.params;
      const one = await orders.readOne(oid);
    } catch (error) {
      return next(error);
    }
  });
export default router;
