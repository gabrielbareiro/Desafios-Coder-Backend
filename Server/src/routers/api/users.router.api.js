import { Router } from "express";
import users from "../../fs/user.Fs.Manager.js";
import propsUser from "../../middlewares/propsUsers.mid.js";
const router = Router();

router
  .post("/", propsUser, async (req, res, next) => {
    try {
      const data = req.body;
      const response = await users.create(data);
      return res.json({
        statusCode: 201,
        response: "user created successfully!",
      });
    } catch (error) {
      return next(error);
    }
  })
  .get("/", async (req, res, next) => {
    try {
      const all = await users.read();
      return res.json({ statusCode: 200, response: all });
    } catch (error) {
      return next(error);
    }
  })
  .get("/:uid", async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await users.readOne(uid);
      return res.json({ statusCode: 200, response: one });
    } catch (error) {
      next(error);
    }
  })
  .put("/:uid", async (req, res, next) => {
    try {
      const {
        body,
        params: { uid },
      } = req;
      const one = await users.update(uid, body);
      return res.json({ statusCode: 200, message: "Updated successfully" });
    } catch (error) {
      return next(error);
    }
  })
  .delete("/:uid", async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await users.destroy(uid);
      return res.json({ statusCode: 200, message: "successfully removed" });
    } catch (error) {
      return next(error);
    }
  });

export default router;
