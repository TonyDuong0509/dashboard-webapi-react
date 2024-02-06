import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { BasketItem } from "../../app/models/basket";
import { removeBasketItemAsync } from "../../app/slice/basketSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

const BasketTable = ({ items, isBasket = true }: Props) => {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 24, fontWeight: "bold" }}>
              Customer
            </TableCell>
            <TableCell sx={{ fontSize: 24, fontWeight: "bold" }} align="center">
              COD
            </TableCell>
            <TableCell sx={{ fontSize: 24, fontWeight: "bold" }} align="center">
              Quantity
            </TableCell>
            {isBasket && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img
                    src={item.pictureUrl}
                    alt={item.name}
                    style={{ height: 40, marginRight: 20 }}
                  />
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="center">
                {(item.cod / 1000).toFixed(3)} VNĐ
              </TableCell>
              <TableCell align="center">{item.quantity}</TableCell>
              {isBasket && (
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status === "pendingRemoveItem" + item.productId + "del"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasketTable;
