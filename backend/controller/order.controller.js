import Order from "../model/Order.js";

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
    user: req.user._id
  })

  res.send({message: "Order created!", orderId: order._id, order})

};

const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.send(orders)
}

const getOrderById = async (req, res) => {
  const {id} = req.params;
  const order = await Order.findById(id);
  if(!order) return res.status(404).send({error: "Order not found!"})
    res.send(order)
}

const getMyOrders = async (req, res) => {
  const orders = await Order.find({user: req.user._id});
  res.send(orders)
}

const deliverOrder = async (req, res) => {
  const {id} = req.params;
  const order = await Order.findById(id);
  if(!order)
    return res.status(404).send({error: "Order not found"})
  if(!order.isPaid)
    return res.status(400).send({error: "Order not paid yet!"})
  order.isDelivered = true
  order.deliveredAt = new Date()

  await order.save()
  res.send({message: "Order delivered!"})
}

const payOrder = async (req, res) => {
   const {id} = req.params;
  const order = await Order.findById(id);
  if(!order)
    return res.status(404).send({error: "Order not found"})

  order.isPaid = true
  order.paidAt = new Date()

  await order.save()
  res.send({message: "Order paid!"})
}


export {addOrder, getOrders, getMyOrders, getOrderById, deliverOrder, payOrder}
