import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { setProductParams } from "../../app/slice/productSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";

const ProductSearch = () => {
  const { productParams } = useAppSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 2000);
  return (
    <TextField
      label="Search customer"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(event: any) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
    />
  );
};

export default ProductSearch;
