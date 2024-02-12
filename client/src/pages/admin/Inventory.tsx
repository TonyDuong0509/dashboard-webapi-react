import { Edit, Delete } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import useProducts from "../../app/hooks/useProducts";
import { useAppDispatch } from "../../app/store/configureStore";
import AppPagination from "../../components/appPagination/AppPagination";
import { removeProduct, setPageNumber } from "../../app/slice/productSlice";
import { useState } from "react";
import { Product } from "../../app/models/product";
import ProductForm from "./ProductForm";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

const Inventory = () => {
  const { products, metaData } = useProducts();
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
    setEditMode(true);
  }

  function handleDeleteProduct(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteProduct(id)
      .then(() => dispatch(removeProduct(id)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedProduct) setSelectedProduct(undefined);
    setEditMode(false);
  }

  if (editMode)
    return <ProductForm product={selectedProduct} cancelEdit={cancelEdit} />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2, fontWeight: "bold" }} variant="h4">
          Nơi thêm hoặc chỉnh sửa hàng hoá
        </Typography>
        <Button
          onClick={() => setEditMode(true)}
          sx={{ m: 2 }}
          size="large"
          variant="contained"
        >
          Thêm hàng mới
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Khách hàng</TableCell>
              <TableCell align="right">COD</TableCell>
              <TableCell align="center">Loại</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <img
                      src={product.pictureUrl}
                      alt={product.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(product.cod)}
                </TableCell>
                <TableCell align="center">{product.type}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleSelectProduct(product)}
                    startIcon={<Edit />}
                  />
                  <LoadingButton
                    loading={loading && target === product.id}
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
                  ></LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {metaData && (
        <Box sx={{ pt: 2 }}>
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          ></AppPagination>
        </Box>
      )}
    </>
  );
};

export default Inventory;
