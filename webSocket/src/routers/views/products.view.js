import { Router } from "express";
import products from "../../data/fs/product.Fs.Manager.js";
const productsRouter = Router();

productsRouter.get("/real", async (req, res, next) => {
  try {
    const all = await products.read();
    return res.render("real", { products: all });
  } catch (error) {
    next(error);
  }
});

// productsRouter.get("/new", async (req, res, next) => {
//   try {
//     res.render("new");
//   } catch (error) {
//     next(error);
//   }
// });

productsRouter.get("/form", async (req, res, next) => {
  try {
    const all = await products.read();
    res.render("form", { products: all });
  } catch (error) {
    next(error);
  }
});
export default productsRouter;
