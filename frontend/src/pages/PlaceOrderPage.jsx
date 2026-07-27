import React from "react";
import { Card, Col, Image, ListGroup, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import CartPage from "./CartPage";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearCart } from "../slices/cartSlice";
import { useAddOrderMutation } from "../slices/orderApiSlice";
import { toast } from "react-toastify";

function PlaceOrderPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const placeOrderHandler = async () => {
    try {
      const res = await addOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        itemPrice: cart.itemPrice,
        shippingCharge: cart.shippingCharge,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        paymentMethod: cart.paymentMethod,
      }).unwrap();
      dispatch(clearCart());
      toast.success(res.message);
      navigate("/order/" + res.orderId);
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <h1>Order</h1>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p>
                <strong>Address: </strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city},{cart.shippingAddress.postal},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment</h3>
              <p>
                <strong>Method: </strong>{" "}
                {cart.paymentMethod == "cod" ? "Cash On Delviery" : "E-Sewa"}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        ${item.price} X {item.qty} = ${item.price * item.qty}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Item Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingCharge}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  variant="dark"
                  onClick={placeOrderHandler}
                  disabled={isLoading}
                >
                  Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderPage;
