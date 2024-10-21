// Summary: This file contains the functions to add, get, delete and update address of a store.

import Address from "../../models/addressModel.js";

// The addAddress function is used to add a new address to the store.
const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      // check if all fields are provided
      return res.status(400).json({ message: "All fields are required" });
    }
    // check phone number length
    if (phone.length !== 12) {
      return res
        .status(400)
        .json({ message: "Phone number must be 12 digits" });
    }
    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });
    await newAddress.save();
    res
      .status(201)
      .json({ message: "Address added successfully", data: newAddress });
  } catch (error) {
    console.log("Error in addAddress controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// The getAllAddress function is used to get all the addresses of users.
const getAllAddress = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ message: "User id is required" });
    }
    const addresses = await Address.find({ userId });
    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    console.log("Error in getAllAddress controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const { userId } = req.body;
    if (!addressId || !userId) {
      return res.status(400).json({ message: "User and address are required" });
    }
    const address = await Address.findOneAndDelete({ _id: addressId, userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAddress controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const updateAddress = async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const formData = req.body;
    const userId = formData.userId;
    if (!addressId || !userId) {
      return res.status(400).json({ message: "User and address are required" });
    }
    // list of fields that can be updated
    const allowedFields = ["address", "city", "pincode", "phone", "notes"];
    const filterFields = {};
    // filter out the fields that are not allowed
    Object.keys(formData).forEach((field) => {
      if (allowedFields.includes(field)) {
        filterFields[field] = formData[field];
      }
    });
    // console.log("filterFields: ", filterFields);
    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId }, // find address by id and user id
      filterFields, // update the address
      { new: true } // options: return updated data
    );
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res
      .status(200)
      .json({ message: "Address updated successfully", data: address });
  } catch (error) {
    console.log("Error in updateAddress controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addAddress, getAllAddress, deleteAddress, updateAddress };
