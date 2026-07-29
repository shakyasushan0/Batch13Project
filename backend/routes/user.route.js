import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/user.controller.js";
import { checkAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile", checkAuth, updateProfile);

export default router;
