import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  toppings: {
    type: [String], // Array of strings representing available toppings
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  image: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  totalStock: { type: Number, required: true },
  averageRating: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;
