import { useEffect } from "react";
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
import { useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import NotFound from "../../app/errors/NotFound";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchProductAsync,
  productSelectors,
} from "../../app/slice/productSlice";
import { currencyFormat } from "../../app/util/util";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { status: productStatus } = useAppSelector((state) => state.product);
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id!)
  );

  useEffect(() => {
    if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
  }, [id, product, dispatch]);

  if (productStatus.includes("pending"))
    return <LoadingComponent message="Loading product..." />;
  if (!product) return <NotFound />;

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
        <Typography color="green" variant="h3">
          {product.brand}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="orange">
          {currencyFormat(product.cod)} VNĐ
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Khách</TableCell>
                <TableCell sx={{ color: "white" }}>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Mô tả</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {product.description}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Khối lượng</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {product.weight} kg
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Loại</TableCell>
                <TableCell sx={{ color: "white" }}>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Số lượng</TableCell>
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
