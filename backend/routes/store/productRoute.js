import express from "express";
import { getProductDetails } from "../../controllers/store/productController.js";

const ProductRouter = express.Router();

ProductRouter.get("/get/:id", getProductDetails);
export default ProductRouter;
