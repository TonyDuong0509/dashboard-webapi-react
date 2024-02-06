import { useCallback, useEffect, useState } from "react";
import "./Products.scss";
import Add from "../../components/add/Add";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  updateProductIsWeighedAsync,
  setIsWeighed, // Added import
} from "../../app/slice/productSlice";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import DataTable from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import AppPagination from "../../components/appPagination/AppPagination";

const columns: GridColDef[] = [
  {
    field: "pictureUrl",
    headerName: "Img",
    width: 50,
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
    width: 150,
  },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 140,
  },
  {
    field: "cod",
    type: "number",
    headerName: "COD ",
    width: 90,
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
];

const Products = () => {
  const [open, setOpen] = useState(false);

  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, metaData, isWeighedMap } =
    useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const handleIsWeighedClick = useCallback(
    (row: any) => {
      dispatch(
        updateProductIsWeighedAsync({
          id: row.id,
          isWeighed: !row.isWeighed,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  useEffect(() => {
    dispatch(
      setIsWeighed(
        products.reduce((map, product) => {
          map[product.id] = product.isWeighed;
          return map;
        }, {} as Record<number, boolean>)
      )
    );
  }, [products, dispatch]);

  if (!filtersLoaded) return <LoadingComponent message="Loading products..." />;

  return (
    <div className="products">
      <div className="info">
        <h2>List Products</h2>
        {user && (
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            size="small"
          >
            Add New Product
          </Button>
        )}
      </div>
      <DataTable
        slug="products"
        columns={columns}
        rows={products}
        handleIsWeighedClick={handleIsWeighedClick}
        isWeighedMap={isWeighedMap}
      />

      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mb: 2 }}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
