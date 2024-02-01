import { useEffect, useState } from "react";
import "./productDetails.scss";
import {
  Grid,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h3>Loading...</h3>;

  if (!product) return <h3>Product not found...</h3>;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography color="red" variant="h3">
          {product.brand}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="green">
          {(product.cod / 1000).toFixed(3)} VNĐ
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Owner</TableCell>
                <TableCell sx={{ color: "white" }}>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Description</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {product.description}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Weight</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {product.weight} kg
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Type</TableCell>
                <TableCell sx={{ color: "white" }}>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Quantity</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {product.quantity}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Time</TableCell>
                <TableCell sx={{ color: "violet" }}>
                  {product.date.toString().replace("T", " ").split(".")[0]}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
