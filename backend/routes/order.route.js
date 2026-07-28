import express from "express";
import {
  addOrder,
  confirmPayment,
  deliverOrder,
  getEsewaPaymentDetails,
  getMyOrders,
  getOrderById,
  getOrders,
  payOrder,
} from "../controller/order.controller.js";
import { checkAdmin, checkAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", checkAuth, addOrder);
router.get("/", checkAuth, checkAdmin, getOrders);
router.get("/myorders", checkAuth, getMyOrders);
router.get("/confirmpayment", confirmPayment);
router.get("/:id", checkAuth, getOrderById);
router.put("/:id/deliver", checkAuth, checkAdmin, deliverOrder);
router.put("/:id/pay", checkAuth, payOrder);
router.get("/:id/getpaymentdetails", checkAuth, getEsewaPaymentDetails);

export default router;
