import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";

import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductbyID,
  getProducts,
  updateProduct,
} from "../controller/productController.js";
const router = express.Router();
// -----------------api
// router.route("/").get(protect, admin, getProducts); restrict for accessing home page

// no restriction
router.route("/").get(getProducts).post(protect, admin, createProduct);

// -----------------api
router
  .route("/:id")
  .get(getProductbyID)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/review").post(protect, createProductReview);
export default router;
