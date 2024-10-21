import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", AddressSchema);

export default Address;
