import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product, ProductParams } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/pagination";

interface ProductState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  isGone: string[];
  productParams: ProductParams;
  metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy);
  if (productParams.searchTerm)
    params.append("searchTerm", productParams.searchTerm);
  if (productParams.types.length > 0)
    params.append("types", productParams.types.toString());
  if (productParams.brands.length > 0)
    params.append("brands", productParams.brands.toString());
  if (productParams.isGone.length > 0)
    params.append("isGone", productParams.isGone.toString());
  return params;
}

export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("product/fetchProductsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().product.productParams);
  try {
    const response = await agent.Product.list(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "product/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      const product = await agent.Product.details(productId);
      return product;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchFilters = createAsyncThunk(
  "product/fetchFilters",
  async (_, thunkAPI) => {
    try {
      return agent.Product.fetchFilters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

function initParams(): ProductParams {
  return {
    pageNumber: 1,
    pageSize: 10,
    orderBy: "name",
    brands: [],
    types: [],
    isGone: [],
  };
}

export const productSlice = createSlice({
  name: "product",
  initialState: productsAdapter.getInitialState<ProductState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    brands: [],
    types: [],
    isGone: [],
    productParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      (state.status = "idle"), (state.productsLoaded = true);
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
    builder.addCase(fetchFilters.pending, (state) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.isGone = action.payload.isGone;
      state.status = "idle";
      state.filtersLoaded = true;
    });
    builder.addCase(fetchFilters.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const {
  setProductParams,
  resetProductParams,
  setMetaData,
  setPageNumber,
} = productSlice.actions;

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.product
);