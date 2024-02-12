import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Customer, CustomerParams } from "../models/customer";
import { MetaData } from "../models/pagination";
import { RootState } from "../store/configureStore";

interface CustomerState {
  customersLoaded: boolean;
  status: string;
  customerParams: CustomerParams;
  metaData: MetaData | null;
}

const customerAdapter = createEntityAdapter<Customer>();

function getAxiosParams(customerParams: CustomerParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", customerParams.pageNumber.toString());
  params.append("pageSize", customerParams.pageSize.toString());
  if (customerParams.searchTerm)
    params.append("searchTerm", customerParams.searchTerm);
  return params;
}

export const fetchCustomersAsync = createAsyncThunk<
  Customer[],
  void,
  { state: RootState }
>("customer/fetchCustomersAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().customer.customerParams);
  try {
    const response = await agent.Customer.list(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchCustomerAsync = createAsyncThunk<Customer, number>(
  "customer/fetchCustomerAsync",
  async (customerId, thunkAPI) => {
    try {
      const customer = await agent.Customer.details(customerId);
      return customer;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

function initParams(): CustomerParams {
  return {
    pageNumber: 1,
    pageSize: 10,
  };
}

export const customerSlice = createSlice({
  name: "customer",
  initialState: customerAdapter.getInitialState<CustomerState>({
    customersLoaded: false,
    status: "idle",
    customerParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setCustomerParams: (state, action) => {
      state.customersLoaded = false;
      state.customerParams = {
        ...state.customerParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.customersLoaded = false;
      state.customerParams = { ...state.customerParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetCustomerParams: (state) => {
      state.customerParams = initParams();
    },
    setCustomer: (state, action) => {
      customerAdapter.updateOne(state, action.payload);
      state.customersLoaded = false;
    },
    removeCustomer: (state, action) => {
      customerAdapter.removeOne(state, action.payload);
      state.customersLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomersAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchCustomersAsync.fulfilled, (state, action) => {
      customerAdapter.setAll(state, action.payload);
      (state.status = "idle"), (state.customersLoaded = true);
    });
    builder.addCase(fetchCustomersAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchCustomerAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchCustomerAsync.fulfilled, (state, action) => {
      customerAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchCustomerAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
  },
});

export const {
  setCustomerParams,
  setPageNumber,
  setMetaData,
  resetCustomerParams,
  setCustomer,
  removeCustomer,
} = customerSlice.actions;

export const customerSelectors = customerAdapter.getSelectors(
  (state: RootState) => state.customer
);
