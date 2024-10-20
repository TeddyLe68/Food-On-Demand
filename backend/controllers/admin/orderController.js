import Order from "../../models/orderModel.js";

// Get all orders
const getAllOrdersOfUser = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log("Error in getAllOrdersOfUser controller ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get order detail
const getOrderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.log("Error in getOrderDetails controller ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update order status

const updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const oderStatus = req.body;

    const order = await Order.findByIdAndUpdate(id, oderStatus);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log("Error in updateOrderStatus controller ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { getAllOrdersOfUser, getOrderDetails, updateOrderStatus };
