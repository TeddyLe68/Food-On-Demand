import express from "express";
import {
  createPizza,
  deletePizza,
  editPizza,
  getAllPizzas,
  getPizzaById,
  handleImageUpload,
} from "../../controllers/admin/productController.js";
import { upload } from "../../services/cloudinary.js";
const adminProductRouter = express.Router();

adminProductRouter.post(
  "/upload-image",
  upload.single("image"),
  handleImageUpload
);
adminProductRouter.post("/add", createPizza);
adminProductRouter.put("/edit/:id", editPizza);
adminProductRouter.delete("/delete/:id", deletePizza);
adminProductRouter.get("/get", getAllPizzas);
adminProductRouter.get("/:id", getPizzaById);

export default adminProductRouter;
