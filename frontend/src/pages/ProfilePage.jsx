import { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(userInfo.fullname || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const {
    data: orders,
    isLoading: orderLoading,
    error,
  } = useGetMyOrdersQuery();
  console.log(orders);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password != confirmPassword) {
        toast.error("Password not matched!");
      } else {
        const res = await updateProfile({ fullname, email, password }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile Updated!");
      }
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="dark" className="my-2">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Orders</h2>
        {orderLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.error}</Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <th>ID</th>
              <th>DATE</th>
              <th>PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <Link
                      className="btn btn-light btn-sm"
                      to={`/order/${order._id}`}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfilePage;
