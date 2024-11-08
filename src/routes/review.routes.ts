import { Router } from "express";
import ReviewController from "../controllers/review.controller";
import { queryParamsValidator } from "../middlewares/schema.validator";
import { GetReviewsDetails } from "../schemas/review";

const reviewRouter = Router({ mergeParams: true });

const reviewController = new ReviewController();

reviewRouter.get(
  "/",
  queryParamsValidator(GetReviewsDetails),
  reviewController.getReviewsDetails,
);

reviewRouter.get("/stats", reviewController.getBusinessDetailStats);

reviewRouter.get("/:product_id", reviewController.getProductDetails);

export default reviewRouter;
