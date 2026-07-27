import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Col, Form, Button } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { setPaymentMethod as savePaymentMethod } from "../slices/cartSlice";
import { useNavigate } from "react-router";

function PaymentPage() {
  const { paymentMethod: storedPaymentMethod } = useSelector(
    (state) => state.cart,
  );
  const [paymentMethod, setPaymentMethod] = useState(
    storedPaymentMethod || "cod",
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment</h2>
      <Form onSubmit={submitHandler}>
        <Form.Label as="legend">Select Payment Method</Form.Label>
        <Col>
          <Form.Check
            type="radio"
            name="paymentMethod"
            value="cod"
            label="Cash On Delivery"
            onChange={(e) => setPaymentMethod(e.target.value)}
            checked={paymentMethod == "cod"}
          />
        </Col>
        <Col>
          <Form.Check
            type="radio"
            name="paymentMethod"
            value="esewa"
            label="E-Sewa"
            onChange={(e) => setPaymentMethod(e.target.value)}
            checked={paymentMethod == "esewa"}
          />
        </Col>
        <Button className="my-3" variant="dark" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentPage;
