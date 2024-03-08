import express from "express";
import dotenv from "dotenv";
// static data
// import products from "./data/products.js";
import path from "path";
import cors from "cors";
import connectDB from "./config/db.js";
// import Product from "./models/productModel.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
// import authRoutes from "./routes/authRoutes.js"
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
// import stripe from "./utils/stripe.js";
//_____________________________________________
// import passport from "./utils/passport.js";
//_____________________________________________
dotenv.config();
// whenever app start  imediately connected to the database connectDB(); after dotenvconfig
connectDB();
const PORT = process.env.PORT || 5000;
//_____________________________________________
// passport(app)
//_____________________________________________
const app = express();

//_____________________________________________//

//https://stackoverflow.com/questions/57009371/access-to-xmlhttprequest-at-from-origin-localhost3000-has-been-blocked

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  next();
});
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5173"],
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
);

// //_____________________________________________

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// stripe(app);

// -------------------------------
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
//_____________________________________________
// app.use("/auth", authRoutes)
//_____________________________________________
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------------production-------------------
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  app.use(express.static(path.join(__dirname, "/project-name-frontend/dist")));
  app.use("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "project-name-frontend", "dist", "index.html")
    )
  );
} else {
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}
// -------------------------------

app.use(notFound);
app.use(errorHandler);

// ----------------- start server
app.listen(PORT, () => {
  console.log(`server running on port http://127.0.0.1:${PORT}`);
});
