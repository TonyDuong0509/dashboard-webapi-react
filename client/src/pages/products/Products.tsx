import { useCallback, useEffect } from "react";
import "./Products.scss";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  setPageNumber,
  updateProductIsWeighedAsync,
  setIsWeighed,
} from "../../app/slice/productSlice";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import DataTable from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import AppPagination from "../../components/appPagination/AppPagination";
import useProducts from "../../app/hooks/useProducts";

const columns: GridColDef[] = [
  {
    field: "pictureUrl",
    headerName: "Ảnh",
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
    headerName: "Khách",
    width: 150,
  },
  {
    field: "description",
    type: "string",
    headerName: "Mô tả",
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
    headerName: "Kg",
    width: 70,
  },
  {
    field: "type",
    headerName: "Loại",
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
    headerName: "Số hàng",
    width: 80,
    type: "number",
  },
];

const Products = () => {
  const { products, filtersLoaded, productsLoaded, metaData } = useProducts();
  const { isWeighedMap } = useAppSelector((state) => state.product);
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
        <h2>Danh sách hàng hoá</h2>
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
    </div>
  );
};

export default Products;
