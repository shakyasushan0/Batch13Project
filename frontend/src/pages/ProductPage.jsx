import { useState } from "react";
import { useParams, Link } from "react-router";
import products from "../products";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Badge,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductPage() {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error?.error}</Message>
      ) : (
        <>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>{product.name}</ListGroup.Item>
                <ListGroup.Item>${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        <strong>
                          {product.countInStock == 0 ? (
                            <Badge bg="danger">Out of Stock</Badge>
                          ) : (
                            <Badge bg="success">In Stock</Badge>
                          )}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1}>{x + 1}</option>
                              ),
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      variant="dark"
                      disabled={product.countInStock == 0}
                      onClick={() => {
                        dispatch(addToCart({ ...product, qty: Number(qty) }));
                      }}
                    >
                      Add to Cart
                    </Button>
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

export default ProductPage;
