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
import { useEffect, useState } from "react";
import Modal from "react-modal";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

const BasketTable = ({ items, isBasket = true }: Props) => {
  const { status } = useAppSelector((state) => state.basket);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const dispatch = useAppDispatch();

  const appElement = document.getElementById("root");

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 24, fontWeight: "bold" }}>
              Khách hàng
            </TableCell>
            <TableCell sx={{ fontSize: 24, fontWeight: "bold" }} align="center">
              COD
            </TableCell>
            <TableCell sx={{ fontSize: 24, fontWeight: "bold" }} align="center">
              Số lượng
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
                    style={{
                      height: 50,
                      width: 50,
                      marginRight: 20,
                      cursor: "pointer",
                    }}
                    onClick={openModal}
                  />
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "blue",
                    }}
                  >
                    {item.name}
                  </span>
                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Product Image Modal"
                    appElement={appElement || undefined}
                    style={{
                      overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      },
                      content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        padding: "20px",
                        border: "none",
                        borderRadius: "8px",
                        width: "80%",
                        maxWidth: "600px",
                      },
                    }}
                  >
                    <button
                      onClick={closeModal}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "none",
                        border: "none",
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "red",
                      }}
                    >
                      X
                    </button>
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  </Modal>
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
