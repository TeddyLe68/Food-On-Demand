import express from "express";
import {
  createPizza,
  deletePizza,
  editPizza,
  getAllPizzas,
  getPizzaById,
  processImageUpload,
} from "../../controllers/admin/productController.js";
import upload from "../../services/cloudinary.js";
const adminProductRouter = express.Router();

adminProductRouter.post("/upload", upload.single("image"), processImageUpload);
adminProductRouter.post("/create", createPizza);
adminProductRouter.get("/list", getAllPizzas);
adminProductRouter.get("/:id", getPizzaById);
adminProductRouter.put("/edit/:id", editPizza);
adminProductRouter.post("/delete/:id", deletePizza);

export default adminProductRouter;
