import Order from "../../models/orderModel.js";
import Pizza from "../../models/productModel.js";
import ProductReview from "../../models/reviewModel.js";

const addReview = async (req, res) => {
  try {
    const { productId, userId, username, reviewMessage, reviewValue } =
      req.body;
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
    }); // check if user has ordered the product
    if (!order) {
      return res
        .status(400)
        .json({ message: "You need to purchase product to review it !" });
    }
    const checkReview = await ProductReview.findOne({ userId, productId });

    if (checkReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product !" });
    }
    const newReview = new ProductReview({
      productId,
      userId,
      username,
      reviewMessage,
      reviewValue,
    });
    await newReview.save();

    const reviews = await ProductReview.find({ productId });
    const totalReviews = reviews.length;
    const averageRating =
      reviews.reduce((current, item) => item.reviewValue + current, 0) /
      totalReviews;

    await Pizza.findByIdAndUpdate(productId, { averageRating });
    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    console.log("Error in addReview controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ProductReview.find({ productId });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.log("Error in getReviewsByProductId controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addReview, getReviewsByProductId };
