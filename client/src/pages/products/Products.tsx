import { useEffect, useState } from "react";
import "./Products.scss";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import LoadingComponent from "../../app/layout/LoadingComponent";
import DataTable from "../../components/dataTable/DataTable";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchProductsAsync,
  productSelectors,
} from "../../app/slice/productSlice";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 40 },
  {
    field: "pictureUrl",
    headerName: "Image",
    width: 70,
    renderCell: (params) => {
      return (
        <Link to={`/products/${params.row.id}`}>
          <img
            src={params.row.pictureUrl || "/noavatar.png"}
            alt={params.row.name}
          />
        </Link>
      );
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "Owner",
    width: 120,
  },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 120,
  },
  {
    field: "cod",
    type: "number",
    headerName: "COD (VNĐ)",
    width: 110,
  },
  {
    field: "weight",
    type: "number",
    headerName: "Weight",
    width: 70,
  },
  {
    field: "type",
    headerName: "Type",
    width: 70,
    type: "string",
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 80,
    type: "string",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 80,
    type: "number",
  },
  {
    field: "status",
    headerName: "Status",
    width: 80,
    type: "boolean",
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  if (status.includes("pending"))
    return <LoadingComponent message="Loading products..." />;

  return (
    <div className="products">
      <div className="info">
        <h1>List Products</h1>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add New Product
        </Button>
      </div>
      <DataTable slug="products" columns={columns} rows={products} />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
