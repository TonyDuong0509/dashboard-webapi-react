import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import { useAppSelector } from "../../app/store/configureStore";

export default function BasketSummary() {
  const { basket } = useAppSelector((state) => state.basket);
  const totalCOD = basket?.items.reduce((sum, item) => sum + item.cod, 0) ?? 0;
  const totalProducts =
    basket?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Total COD</TableCell>
              <TableCell align="right">{currencyFormat(totalCOD)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total Products</TableCell>
              <TableCell align="right">{totalProducts}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
