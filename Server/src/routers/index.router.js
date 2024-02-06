import { Router } from "express";
import apiProducts from "./api/products.router.api.js";
import apiUser from "./api/users.router.api.js";
import apiOrder from "./api/orders.router.api.js";
const router = Router();

router.use("/api", apiProducts).use("/user", apiUser).use("/order", apiOrder);

export default router;
