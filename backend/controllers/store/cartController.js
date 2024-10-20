import Cart from "../../models/cartModel.js";
import Pizza from "../../models/productModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body; // destructuring the request body
    if (!userId || !productId || quantity <= 0) {
      // check if any of the required fields are missing
      return res
        .status(400)
        .json({ success: false, error: "Invalid data provided" });
    }
    const product = await Pizza.findById(productId); // find the product by its id
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    let cartData = await Cart.findOne({ userId }); // find the cart by the user id
    if (!cartData) {
      cartData = new Cart({ userId, items: [] });
    }
    const currentProductItem = cartData.items.findIndex(
      // find the index of the product in the cart
      (item) => item.productId.toString() === productId
    );
    if (currentProductItem === -1) {
      // if the product is not in the cart, add it to the cart
      cartData.items.push({ productId, quantity });
    } else {
      // if the product is already in the cart, update the quantity
      cartData.items[currentProductItem].quantity += quantity;
    }
    await cartData.save();
    res.status(200).json({ success: true, message: "Added to Cart", cartData });
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
// getCartItems
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid data provided" });
    }

    const cartData = await Cart.findOne({ userId }).populate({
      // find the cart by the user id and populate the product details
      path: "items.productId",
      select: "name price image",
    });
    if (!cartData) {
      return res.status(404).json({ success: false, error: "Cart not found" });
    }
    const validItems = cartData.items.filter(
      (productItem) => productItem.productId
    ); // filter out invalid items
    if (validItems.length !== cartData.items.length) {
      // if there are invalid items, update the cart
      cartData.items = validItems;
      await cartData.save();
    }
    const populatedCartItem = validItems.map((item) => ({
      // map the cart items to include the product details
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      image: item.productId.image,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: { ...cartData._doc, items: populatedCartItem },
    });
  } catch (error) {
    console.log("Error in getCartItems controller", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
// remove items from user cart
const deleteFromCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const { productId } = req.params;
    // console.log("userId", userId);
    // console.log("productId", productId);
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid data provided" });
    }

    const cartData = await Cart.findOne({ userId });
    if (!cartData) {
      return res.status(404).json({ success: false, error: "Cart not found" });
    }
    cartData.items = cartData.items.filter((item) => {
      item.productId.toString() !== productId;
    });
    await cartData.save();
    await cartData.populate({
      path: "items.productId",
      select: "name price image",
    });
    const populatedCartItem = cartData.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      name: item.productId ? item.productId.name : null,
      price: item.productId ? item.productId.price : null,
      image: item.productId ? item.productId.image : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: { ...cartData._doc, items: populatedCartItem },
    });
  } catch (error) {
    console.log("Error in removeFromCart controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update item quantity in user cart
const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid data provided" });
    }
    const cartData = await Cart.findOne({ userId });
    if (!cartData) {
      return res.status(404).json({ success: false, error: "Cart not found" });
    }
    const currentProductItemIndex = cartData.items.findIndex((item) => {
      return item.productId.toString() === productId;
    });
    if (currentProductItemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found in cart" });
    }
    cartData.items[currentProductItemIndex].quantity = quantity;
    await cartData.save();

    await cartData.populate({
      path: "items.productId",
      select: "name price image",
    });
    const populatedCartItem = cartData.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      name: item.productId ? item.productId.name : null,
      price: item.productId ? item.productId.price : null,
      image: item.productId ? item.productId.image : null,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: { ...cartData._doc, items: populatedCartItem },
    });
  } catch (error) {
    console.log("Error in updateCartItemQuantity controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export { addToCart, deleteFromCart, getCartItems, updateCartItemQuantity };
