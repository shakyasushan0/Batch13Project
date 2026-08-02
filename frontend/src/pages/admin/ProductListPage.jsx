import React from "react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../slices/productApiSlice";
import { Button, Row, Col, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { Link } from "react-router";

function ProductListPage() {
  const {
    data: products,
    isLoading: productLoading,
    error: productError,
  } = useGetProductsQuery();
  const [createProduct, { isLoading: addProductLoading }] =
    useCreateProductMutation();

  const addProductHandler = async () => {
    if (window.confirm("Are you sure you want to add new product?")) {
      try {
        const res = await createProduct().unwrap();
        toast.success(res.message);
      } catch (err) {
        toast.error(err?.data?.error);
      }
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-end">
          <Button variant="dark" size="sm" onClick={addProductHandler}>
            <FaEdit />
            Create Product
          </Button>
        </Col>
      </Row>
      {productLoading ? (
        <Loader />
      ) : productError ? (
        <Message variant="danger">{productError?.data?.error}</Message>
      ) : (
        <Table striped hover responsive>
          <thead>
            <td>ID</td>
            <td>NAME</td>
            <td>PRICE</td>
            <td>BRAND</td>
            <td>CATEGORY</td>
            <td></td>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>
                  <Link
                    className="btn btn-dark btn-sm"
                    to={`/admin/products/${product._id}/edit`}
                  >
                    <FaEdit />
                  </Link>
                  <Button size="sm" variant="danger" className="mx-2">
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default ProductListPage;
