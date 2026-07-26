import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../slices/cartSlice";

const ShippingPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [data, setData] = useState({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    postal: shippingAddress?.postal || "",
    country: shippingAddress?.country || "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setShippingAddress(data));
  };

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={data.address}
            name="address"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={data.city}
            name="city"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Postal</Form.Label>
          <Form.Control
            type="text"
            value={data.postal}
            name="postal"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            value={data.country}
            name="country"
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" variant="dark">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
