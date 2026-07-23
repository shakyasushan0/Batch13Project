import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { useLoginMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  const dispatch = useDispatch();
  // const { data: products, isLoading, error } = useGetProductsQuery();
  const [login, { isLoading }] = useLoginMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res.user));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <FormContainer>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="dark">
          Login
        </Button>
      </Form>
    </FormContainer>
  );
}

export default LoginPage;
