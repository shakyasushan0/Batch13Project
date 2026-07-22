import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { useGetProductsQuery } from "../slices/productApiSlice";

function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error?.data?.error || error?.error}</h2>
      ) : (
        <>
          <h2>Latest Products</h2>
          {
            <Row>
              {products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          }
        </>
      )}
    </>
  );
}

export default HomePage;
