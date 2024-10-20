import express from "express";
import {
  getAllOrdersOfUser,
  getOrderDetails,
  updateOrderStatus,
} from "../../controllers/admin/orderController.js";

const adminOrderRouter = express.Router();

adminOrderRouter.get("/get", getAllOrdersOfUser);
adminOrderRouter.get("/details/:id", getOrderDetails);
adminOrderRouter.get("/update/:id", updateOrderStatus);

export default adminOrderRouter;
