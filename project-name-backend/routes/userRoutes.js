import express from "express";

import {
  loginUser,
  registerUser,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  getUsers,
  logoutUser,
  updateUser,
  getUserById,
  deleteUser,
} from "../controller/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").get(protect, admin, getUsers);
router.route("/update").put(updateUserProfile);
router.route("/logout").get(logoutUser);
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/forgot-password").post(forgotPassword);
router
  .route("/:id")
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser);

router.route("/reset-password/:resetToken").patch(resetPassword);
export default router;
