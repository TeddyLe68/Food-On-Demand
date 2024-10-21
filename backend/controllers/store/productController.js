import Pizza from "../../models/productModel.js";

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Pizza.findById(id);
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log("Error in getProductDetails controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export { getProductDetails };
