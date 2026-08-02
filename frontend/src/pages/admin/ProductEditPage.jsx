import { useEffect, useState } from "react";
import { Link } from "react-router";
import FormContainer from "../../components/FormContainer";
import { useParams, useNavigate } from "react-router";
import {
  useGetProductByIdQuery,
  useEditProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productApiSlice";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const ProductEditPage = () => {
  const { id } = useParams();
  const { data: product } = useGetProductByIdQuery(id);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [editProduct, { isLoading: editLoading }] = useEditProductMutation();
  const [uploadProductImage, { isLoading: uploadLoading }] =
    useUploadProductImageMutation();
  const navigate = useNavigate();
  useEffect(() => {
    setName(product?.name);
    setPrice(product?.price);
    setBrand(product?.brand);
    setCategory(product?.category);
    setImage(product?.image);
    setDescription(product?.description);
    setCountInStock(product?.countInStock);
  }, [product]);

  const updateProductHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await editProduct({
        _id: id,
        name,
        price,
        countInStock,
        brand,
        category,
        description,
        image,
      }).unwrap();
      navigate("/admin/products");
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };
  const uploadHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.path);
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.error || err?.error);
    }
  };

  return (
    <>
      <Link to="/admin/products" className="btn btn-light">
        Go Back
      </Link>
      <FormContainer>
        <h2>Edit Product</h2>
        <Form onSubmit={updateProductHandler}>
          <Form.Group className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.Control type="file" onChange={uploadHandler} />
            {uploadLoading && <Loader />}
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
