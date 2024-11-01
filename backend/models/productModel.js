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
  image: { type: String, required: false },
  category: { type: String, required: true },
  averageRating: { type: Number, required: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;
