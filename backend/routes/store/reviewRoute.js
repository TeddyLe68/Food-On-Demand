import express from "express";
import {
  addReview,
  getReviewsByProductId,
} from "../../controllers/store/productReviewController.js";
import { protectRoute } from "../../middleware/protectRoute.js";

const storeReviewRouter = express.Router();

storeReviewRouter.post("/add", protectRoute, addReview);
storeReviewRouter.get("/:productId", getReviewsByProductId);
export default storeReviewRouter;
