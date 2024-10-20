import mongoose from "mongoose";

const ProductReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    reviewMessage: {
      type: String,
      required: true,
      trim: true,
    },
    reviewValue: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ProductReviewSchema);

export default Review;
