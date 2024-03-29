import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (import.meta.env.DEV) {
      await sleep();
    }
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateError: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateError.push(data.errors[key]);
            }
          }
          throw modelStateError.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 403:
        toast.error("You are not allowed to do that");
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }
    return Promise.reject(error.message);
  }
);

const request = {
  // get: (url: string) => axios.get(url).then(responseBody),
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  patch: (url: string, body: object) =>
    axios.patch(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
};

function createFormData(item: any) {
  const formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
}

const Admin = {
  createProduct: (product: any) =>
    request.postForm("products", createFormData(product)),
  updateProduct: (product: any) =>
    request.putForm("products", createFormData(product)),
  deleteProduct: (id: number) => request.delete(`products/${id}`),
  deleteCustomer: (id: number) => request.delete(`customers/${id}`),
  createCustomer: (customer: any) =>
    request.postForm("customers", createFormData(customer)),
  updateCustomer: (customer: any) =>
    request.putForm("customers", createFormData(customer)),
};

const Product = {
  // list: () => request.get("products"),
  list: (params: URLSearchParams) => request.get("products", params),
  details: (id: number) => request.get(`products/${id}`),
  fetchFilters: () => request.get("products/filters"),
  updateWeighed: (id: number, isWeighed: boolean) =>
    request.patch(`products/${id}/updatedIsWeighed`, { isWeighed }),
  updateQuantity: (id: number, quantity: number) =>
    request.patch(`products/${id}/updateQuantity`, { quantity }),
};

const Customer = {
  list: (params: URLSearchParams) => request.get("customers", params),
  details: (id: number) => request.get(`customers/${id}`),
};

const Basket = {
  get: () => request.get("basket"),
  addItem: (productId: number, quantity = 1) =>
    request.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    request.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const Account = {
  login: (values: any) => request.post("account/login", values),
  register: (values: any) => request.post("account/register", values),
  currentUser: () => request.get("account/currentUser"),
};

const Orders = {
  list: () => request.get("orders"),
  fetch: (id: number) => request.get(`orders/${id}`),
  create: (values: any) => request.post("orders", values),
  remove: (id: number) => request.delete(`orders/${id}`),
};

const agent = {
  Product,
  Basket,
  Account,
  Orders,
  Admin,
  Customer,
};

export default agent;
