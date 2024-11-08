import { Router } from "express";
import reviewRouter from "./review.routes";

const router = Router({ mergeParams: true });

router.use("/reviews", reviewRouter);

export default router;
