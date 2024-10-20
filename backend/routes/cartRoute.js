import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/store/cartController.js";
import { protectRoute } from "../middleware/protectRoute.js";
const cartRouter = express.Router();

cartRouter.post("/add", protectRoute, addToCart);
cartRouter.post("/remove", protectRoute, removeFromCart);
cartRouter.post("/get", protectRoute, getCart);

export default cartRouter;
