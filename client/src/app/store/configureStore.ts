import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "../slice/basketSlice";
import { productSlice } from "../slice/productSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { accountSlice } from "../slice/accountSlice";

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
    product: productSlice.reducer,
    account: accountSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
