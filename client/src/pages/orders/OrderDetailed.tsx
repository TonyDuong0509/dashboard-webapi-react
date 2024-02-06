import { Box, Typography, Button } from "@mui/material";
import { BasketItem } from "../../app/models/basket";
import { Order } from "../../app/models/order";
import BasketTable from "../basket/BasketTable";

interface Props {
  order: Order;
  setSelectedOrder: (id: number) => void;
}

const OrderDetailed = ({ order, setSelectedOrder }: Props) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography
          sx={{ p: 2, fontWeight: "bold" }}
          gutterBottom
          variant="h4"
          color="green"
        >
          Order# {order.id}
        </Typography>
        <Button
          onClick={() => setSelectedOrder(0)}
          sx={{ m: 2 }}
          size="large"
          variant="contained"
        >
          Trở lại danh sách chuyến đi
        </Button>
      </Box>
      <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
      <div style={{ marginTop: 100 }}></div>
    </>
  );
};

export default OrderDetailed;
