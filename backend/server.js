import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

//import routes
import authRouter from "./routes/auth/authRoute.js";
import cartRouter from "./routes/store/cartRoute.js";
import adminProductRouter from "./routes/admin/productRoute.js";
import adminOrderRouter from "./routes/admin/orderRoute.js";
import categoryRouter from "./routes/admin/categoryRoute.js";
import ProductRouter from "./routes/store/productRoute.js";
import addressRouter from "./routes/store/addressRoute.js";

//app config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json()); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)
app.use(cookieParser());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

//api admin routes
app.use("/api/auth", authRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/admin/categories", categoryRouter);

//api user routes
app.use("/api/store/cart", cartRouter);
app.use("/api/store/products", ProductRouter);
app.use("/api/store/address", addressRouter);
app.use("/images", express.static("uploads"));
// app.use("/api/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Sever started on http://localhost:${PORT}`);
  //db connection
  connectDB();
});
