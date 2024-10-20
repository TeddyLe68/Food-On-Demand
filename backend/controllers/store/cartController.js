import userModel from "../../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  // console.log(req.body.userId);
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log("Error in removeFromCart controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// getCart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let userCart = await userData.cartData;
    res.status(200).json({ success: true, userCart });
  } catch (error) {
    console.log("Error in getCart controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { addToCart, removeFromCart, getCart };
