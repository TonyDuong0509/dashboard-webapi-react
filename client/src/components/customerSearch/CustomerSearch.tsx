import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { setCustomerParams } from "../../app/slice/customerSlice";

const CustomerSearch = () => {
  const { customerParams } = useAppSelector((state) => state.customer);
  const [searchTerm, setSearchTerm] = useState(customerParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event: any) => {
    dispatch(setCustomerParams({ searchTerm: event.target.value }));
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

export default CustomerSearch;
