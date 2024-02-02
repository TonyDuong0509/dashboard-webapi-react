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
  const subCOD = basket?.items.reduce((sum, item) => sum + item.cod, 0) ?? 0;
  // const pickUpFee = subCOD > 10000 ? 0 : 500;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Total COD</TableCell>
              <TableCell align="right">{currencyFormat(subCOD)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Pick Up fee*</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over 5km and 10kg for free pick up
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
