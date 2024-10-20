import express from "express";
import {
  addToCart,
  deleteFromCart,
  getCartItems,
  updateCartItemQuantity,
} from "../../controllers/store/cartController.js";
import { protectRoute } from "../../middleware/protectRoute.js";
const cartRouter = express.Router();

cartRouter.post("/add", protectRoute, addToCart);
cartRouter.get("/get", protectRoute, getCartItems);
cartRouter.put("/update-cart", protectRoute, updateCartItemQuantity);
cartRouter.delete("/delete/:productId", protectRoute, deleteFromCart);
export default cartRouter;
