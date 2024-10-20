import Pizza from "../../models/productModel.js";
import { imageUpload } from "../../services/cloudinary.js";
import Category from "../../models/categoryModel.js";

const processImageUpload = async (req, res) => {
  try {
    const base64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data" + req.file.mimetype + ";base64," + base64;
    const result = await imageUpload(url);

    req.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
};
// Create a new pizza

const createPizza = async (req, res) => {
  try {
    const newProduct = new Pizza({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      availability: req.body.availability,
      image: req.body.image,
      toppings: req.body.toppings,
      totalStock: req.body.totalStock,
      averageRating: req.body.averageRating,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log("Error in createProduct controller ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all pizzas
const getAllPizzas = async (req, res) => {
  try {
    const listOfPizzas = await Pizza.find();
    res.status(200).json({ success: true, data: listOfPizzas });
  } catch (error) {
    console.log("Error in getAllPizzas controller ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a pizza by id
const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    res.status(200).json({ success: true, data: pizza });
  } catch (error) {
    console.log("Error in getPizzaById controller ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Edit a pizza

const editPizza = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      image,
      name,
      description,
      price,
      category,
      toppings,
      availability,
      totalStock,
      averageRating,
    } = req.body;
    const findPizza = await Pizza.findById(id);
    if (!findPizza) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    findPizza.image = image || findPizza.image;
    findPizza.name = name || findPizza.name;
    findPizza.description = description || findPizza.description;
    findPizza.price = price === "" ? 0 : price || findPizza.price;
    findPizza.category = category || findPizza.category;
    findPizza.toppings = toppings || findPizza.toppings;
    findPizza.availability = availability || findPizza.availability;
    findPizza.totalStock = totalStock || findPizza.totalStock;
    findPizza.averageRating = averageRating || findPizza.averageRating;

    await findPizza.save();
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: findPizza,
    });
  } catch (error) {
    console.log("Error in editPizza controller ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a pizza

const deletePizza = async (req, res) => {
  try {
    const id = req.params.id;
    const pizza = await Pizza.findByIdAndDelete(id);
    if (!pizza) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deletePizza controller ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export {
  createPizza,
  processImageUpload,
  getAllPizzas,
  getPizzaById,
  editPizza,
  deletePizza,
};
