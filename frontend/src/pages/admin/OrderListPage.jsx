import React from "react";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import { Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router";

function OrderListPage() {
  const {
    data: orders,
    isLoading: orderLoading,
    error: orderError,
  } = useGetOrdersQuery();

  return (
    <>
      <h2>Orders</h2>
      {orderLoading ? (
        <Loader />
      ) : orderError ? (
        <Message variant="danger">{orderError?.data?.error}</Message>
      ) : (
        <Table striped hover responsive>
          <thead>
            <td>ID</td>
            <td>DATE</td>
            <td>USER</td>
            <td>PRICE</td>
            <td>PAID</td>
            <td>DELIVERED</td>
            <td></td>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.user.fullname}</td>
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
                    className="btn btn-dark btn-sm"
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
    </>
  );
}

export default OrderListPage;
