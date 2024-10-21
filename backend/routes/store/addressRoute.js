import express from "express";
import {
  addAddress,
  deleteAddress,
  getAllAddress,
  updateAddress,
} from "../../controllers/store/addressController.js";
import { protectRoute } from "../../middleware/protectRoute.js";

const addressRouter = express.Router();

addressRouter.post("/add", protectRoute, addAddress);
addressRouter.get("/get", protectRoute, getAllAddress);
addressRouter.delete("/delete/:addressId", protectRoute, deleteAddress);
addressRouter.put("/update/:addressId", protectRoute, updateAddress);
export default addressRouter;
