import { Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setPageNumber } from "../../app/slice/productSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import AppPagination from "../../components/appPagination/AppPagination";
import {
  customerSelectors,
  fetchCustomersAsync,
} from "../../app/slice/customerSlice";
import DataTableCustomer from "../../components/dataTableCustomer/DataTableCustomer";

const columns: GridColDef[] = [
  {
    field: "pictureUrl",
    headerName: "Ảnh",
    width: 50,
    renderCell: (params) => {
      return (
        <Link to={`/customers/${params.row.id}`}>
          <img src="/noavatar.png" alt={params.row.fullName} />
        </Link>
      );
    },
  },
  {
    field: "fullName",
    type: "string",
    headerName: "Tên khách",
    width: 200,
  },
  {
    field: "phoneNumber",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "address",
    type: "string",
    headerName: "Địa chỉ",
    width: 250,
  },
  {
    field: "description",
    headerName: "Mô tả",
    width: 200,
    type: "string",
  },
];

const Customers = () => {
  const customers = useAppSelector(customerSelectors.selectAll);
  const { customersLoaded, metaData } = useAppSelector(
    (state) => state.customer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!customersLoaded) dispatch(fetchCustomersAsync());
  }, [customersLoaded, dispatch]);

  return (
    <div className="products">
      <div className="info">
        <h2>Danh sách khách hàng</h2>
      </div>
      <DataTableCustomer slug="customers" columns={columns} rows={customers} />

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

export default Customers;
