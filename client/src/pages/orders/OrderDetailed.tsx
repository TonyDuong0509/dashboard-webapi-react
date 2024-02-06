import { Box, Typography, Button, Grid } from "@mui/material";
import { BasketItem } from "../../app/models/basket";
import { Order } from "../../app/models/order";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

interface Props {
  order: Order;
  setSelectedOrder: (id: number) => void;
}

const OrderDetailed = ({ order, setSelectedOrder }: Props) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} gutterBottom variant="h4">
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
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  );
};

export default OrderDetailed;
