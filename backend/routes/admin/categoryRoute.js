import express from "express";
import multer from "multer";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
} from "../../controllers/admin/categoryController.js";

const categoryRouter = express.Router();
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

categoryRouter.post("/create", upload.single("image"), createCategory); // create category
categoryRouter.get("/all", getAllCategories); // get all categories
categoryRouter.get("/:id", getCategoryById); // get category by id
categoryRouter.delete("/delete/:id", deleteCategory); // delete category

export default categoryRouter;
