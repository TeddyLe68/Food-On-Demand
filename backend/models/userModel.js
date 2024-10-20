import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from the beginning and end
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures that the email is unique
      lowercase: true, // Converts email to lowercase
      trim: true, // Removes whitespace from the beginning and end
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 10, // Minimum length for phone number
      unique: true, // Ensures that the phone number is unique
    },
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order", // Reference to the Order model
      },
    ],
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
