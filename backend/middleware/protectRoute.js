import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // console.log(token);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }
    //to verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }
    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.body.userId = user.id;
    // console.log(user.id);
    next();
  } catch (err) {
    console.log("Error in protectRoute middleware", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
