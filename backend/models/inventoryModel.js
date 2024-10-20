import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  ingredientName: {
    type: String,
    required: true,
    unique: true,
  },
  stockLevel: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true, // e.g., "kg", "g", "liters"
    default: "kg",
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
