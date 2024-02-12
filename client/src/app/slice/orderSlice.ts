import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store/configureStore";
import { Order } from "../models/order";

interface OrderState {
  ordersLoaded: boolean;
  status: string;
}

const ordersAdapter = createEntityAdapter<Order>();

export const orderSlice = createSlice({
  name: "order",
  initialState: ordersAdapter.getInitialState<OrderState>({
    ordersLoaded: false,
    status: "idle",
  }),
  reducers: {
    removeOrder: (state, action) => {
      ordersAdapter.removeOne(state, action.payload);
      state.ordersLoaded = false;
    },
  },
});

export const { removeOrder } = orderSlice.actions;

export const orderSelectors = ordersAdapter.getSelectors(
  (state: RootState) => state.order
);
