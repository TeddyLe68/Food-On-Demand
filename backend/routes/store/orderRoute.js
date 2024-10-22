import express from "express";
import { protectRoute } from "../../middleware/protectRoute.js";
import {
  createOrder,
  getOrderDetails,
  getOrderListByUser,
  getPayment,
} from "../../controllers/store/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.post("/getPayment", getPayment);
orderRouter.get("/list", protectRoute, getOrderListByUser);
orderRouter.get("/details/:id", protectRoute, getOrderDetails);
export default orderRouter;
