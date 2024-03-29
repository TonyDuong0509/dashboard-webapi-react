import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Order } from "../../app/models/order";
import OrderDetailed from "./OrderDetailed";
import { LoadingButton } from "@mui/lab";
import { Delete } from "@mui/icons-material";
import { useAppDispatch } from "../../app/store/configureStore";
import { removeOrder } from "../../app/slice/orderSlice";

const Orders = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);
  const dispatch = useAppDispatch();

  function handleDeleteOrder(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Orders.remove(id)
      .then(() => dispatch(removeOrder(id)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(false);
    agent.Orders.list()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => setLoading(true));
  }, []);

  if (!loading) return <LoadingComponent message="Loading orders..." />;

  if (selectedOrderNumber > 0 && orders)
    return (
      <OrderDetailed
        order={orders.find((o) => o.id === selectedOrderNumber)!}
        setSelectedOrder={setSelectedOrderNumber}
      />
    );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Order Name</TableCell>
            <TableCell align="center">Items</TableCell>
            <TableCell align="center">Total Products</TableCell>
            <TableCell align="center">Order Date</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {order.shippingAddress.fullName}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {order.shippingAddress.descriptionAddress}
              </TableCell>
              <TableCell align="center">{order.totalProducts}</TableCell>
              <TableCell align="center">
                {order.orderDate.split("T")[0]}
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => setSelectedOrderNumber(order.id)}>
                  VIEW
                </Button>
              </TableCell>
              <TableCell align="center">
                <LoadingButton
                  loading={loading && target === order.id}
                  startIcon={<Delete />}
                  color="error"
                  onClick={() => handleDeleteOrder(order.id)}
                ></LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Orders;
