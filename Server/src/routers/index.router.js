import { Router } from "express";
import apiProducts from "module";

const router = Router();

router.use("/api", apiProducts);

export default router;
