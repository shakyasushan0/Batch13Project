import React from "react";
import { Link, useParams } from "react-router";
import {
  useDeliverOrderMutation,
  useGetOrderByIdQuery,
} from "../slices/orderApiSlice";
import Loading from "../components/Loader";
import Message from "../components/Message";
import { ListGroup, Row, Col, Image, Card, Button } from "react-bootstrap";
import { useLazyGetPaymentDetailsQuery } from "../slices/orderApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
function OrderDetailPage() {
  const { id } = useParams();
  const { data: order, isLoading, error, refetch } = useGetOrderByIdQuery(id);
  const [getPaymentDetails, { data, isFetching }] =
    useLazyGetPaymentDetailsQuery();

  const [deliverOrder, { isLoading: orderDeliverLoading }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleOrderDelivery = async () => {
    try {
      const res = await deliverOrder({ _id: order._id }).unwrap();
      refetch();
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };

  const handlePayment = async () => {
    try {
      const detail = await getPaymentDetails(id).unwrap();
      const form = document.createElement("form");
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
      form.method = "POST";

      for (const key in detail) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.id = key;
        input.name = key;
        input.value = String(detail[key]);
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error?.data?.error}</Message>
      ) : (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div style={{ lineHeight: "8px" }}>
                    <p>
                      <strong>Name:</strong> {order.user.fullname}
                    </p>
                    <p>
                      <strong>Email: </strong>{" "}
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
                    <p>
                      <strong>Address:</strong> {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.postal},{" "}
                      {order.shippingAddress.country}
                    </p>
                  </div>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered at {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered!</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {order.paymentMethod == "cod"
                      ? "Cash On Delivery"
                      : "E-Sewa"}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid at {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid!</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <ListGroup>
                    {order.orderItems.map((item) => (
                      <ListGroup.Item key={item._id}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            ${item.price} X {item.qty} = $
                            {item.price * item.qty}
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
                    <h3>Order Summary</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Item</Col>
                      <Col>${order.itemPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingCharge}</Col>
                    </Row>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {order.paymentMethod == "esewa" && !userInfo.isAdmin && (
                      <Button variant="dark" onClick={handlePayment}>
                        Pay via Esewa
                      </Button>
                    )}
                    {userInfo.isAdmin && !order.isDelivered && (
                      <Button variant="dark" onClick={handleOrderDelivery}>
                        Mark as Delivered
                      </Button>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default OrderDetailPage;
