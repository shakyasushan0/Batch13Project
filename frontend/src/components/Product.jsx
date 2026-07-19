import { Card } from "react-bootstrap";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Card.Img src={product.image} variant="top" />
        <Card.Body>
          <Card.Title as="div">{product.name}</Card.Title>
          <Card.Text as="h3">${product.price}</Card.Text>
          <Card.Text as="div">
            <Rating value={product.rating} text={product.numReviews} />
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default Product;
