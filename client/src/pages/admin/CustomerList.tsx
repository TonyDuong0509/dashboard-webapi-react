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
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import AppPagination from "../../components/appPagination/AppPagination";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { Customer } from "../../app/models/customer";
import {
  customerSelectors,
  removeCustomer,
  setPageNumber,
} from "../../app/slice/customerSlice";
import CustomerForm from "./CustomerForm";

const CustomerList = () => {
  const customers = useAppSelector(customerSelectors.selectAll);
  const { metaData } = useAppSelector((state) => state.customer);
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);

  function handleSelectCustomer(customer: Customer) {
    setSelectedCustomer(customer);
    setEditMode(true);
  }

  function handleDeleteCustomer(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteCustomer(id)
      .then(() => dispatch(removeCustomer(id)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedCustomer) setSelectedCustomer(undefined);
    setEditMode(false);
  }

  if (editMode)
    return <CustomerForm customer={selectedCustomer} cancelEdit={cancelEdit} />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2, fontWeight: "bold" }} variant="h4">
          Nơi thêm hoặc chỉnh sửa khách hàng
        </Typography>
        <Button
          onClick={() => setEditMode(true)}
          sx={{ m: 2 }}
          size="large"
          variant="contained"
        >
          Thêm khách hàng mới
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Khách hàng</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="center">Địa chỉ</TableCell>
              <TableCell align="center">Mô tả</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow
                key={customer.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <img
                      src="/noavatar.png"
                      alt={customer.fullName}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{customer.fullName}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{customer.phoneNumber}</TableCell>
                <TableCell align="center">{customer.address}</TableCell>
                <TableCell align="center">{customer.description}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleSelectCustomer(customer)}
                    startIcon={<Edit />}
                  />
                  <LoadingButton
                    loading={loading && target === customer.id}
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDeleteCustomer(customer.id)}
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

export default CustomerList;
