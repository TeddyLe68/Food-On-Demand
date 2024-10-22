const createOrder = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in createOrder controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getPayment = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in getPayment controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getOrderListByUser = async (req, res) => {};
const getOrderDetails = async (req, res) => {};

export { createOrder, getPayment, getOrderListByUser, getOrderDetails };
