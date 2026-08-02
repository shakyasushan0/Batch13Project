import Order from "../model/Order.js";
import crypto from "crypto";

const addOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    itemPrice,
    shippingCharge,
    taxPrice,
    totalPrice,
    paymentMethod,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingAddress,
    itemPrice,
    taxPrice,
    totalPrice,
    shippingCharge,
    paymentMethod,
    user: req.user._id,
  });

  res.send({ message: "Order created!", orderId: order._id, order });
};

const getOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "fullname");
  res.send(orders);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "fullname email");
  if (!order) return res.status(404).send({ error: "Order not found!" });
  res.send(order);
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
};

const deliverOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ error: "Order not found" });
  if (order.paymentMethod == "esewa" && !order.isPaid)
    return res.status(400).send({ error: "Order not paid yet!" });

  if (order.paymentMethod == "cod") {
    order.isPaid = true;
    order.paidAt = new Date();
  }
  order.isDelivered = true;
  order.deliveredAt = new Date();

  await order.save();
  res.send({ message: "Order delivered!" });
};

const payOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ error: "Order not found" });

  order.isPaid = true;
  order.paidAt = new Date();

  await order.save();
  res.send({ message: "Order paid!" });
};

const getEsewaPaymentDetails = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) res.status(404).send({ error: "Order not found!" });
  const transaction_uuid = `${Date.now()}_${order._id}`;

  const detail = {
    amount: order.itemPrice,
    failure_url: "http://localhost:5173/order/" + order._id,
    product_delivery_charge: order.shippingCharge,
    product_service_charge: "0",
    product_code: "EPAYTEST",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: "http://localhost:3000/api/order/confirmpayment",
    tax_amount: order.taxPrice,
    total_amount: order.totalPrice,
    transaction_uuid: transaction_uuid,
    signature: crypto
      .createHmac("sha256", "8gBm/:&EnhH.1/q")
      .update(
        `total_amount=${order.totalPrice},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`,
      )
      .digest("base64"),
  };
  res.send(detail);
};

const confirmPayment = async (req, res) => {
  const { data } = req.query;
  const esewaStatus = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
  if (status == "COMPLETE") {
    const orderId = transaction_uuid.split("_")[1];
    const order = await Order.findById(orderId);
    order.isPaid = true;
    order.paidAt = new Date();
    await order.save();
    return res.redirect("http://localhost:5173/order/" + orderId);
  }
};

export {
  addOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  deliverOrder,
  payOrder,
  getEsewaPaymentDetails,
  confirmPayment,
};
