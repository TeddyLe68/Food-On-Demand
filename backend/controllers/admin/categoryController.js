import Category from "../../models/categoryModel.js";
import fs from "fs";

// Create New Category
const createCategory = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const category = new Category({
    name: req.body.name,
    image: image_filename,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Category By Id
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: "Category Not Found" });
    }
    res.json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    fs.unlink(`uploads/${category.image}`, () => {}); // delete image from uploads folder
    if (category == null) {
      return res.status(404).json({ message: "Category Not Found" });
    }
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category Deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { createCategory, getAllCategories, getCategoryById, deleteCategory };
