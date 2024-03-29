import { Link } from "react-router-dom";
import "./Menu.scss";
import { Divider, Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import {
  fetchProductsAsync,
  fetchFilters,
  setProductParams,
} from "../../app/slice/productSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import CheckboxButtons from "../checkboxButtons/CheckboxButtons";

const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Trang chủ",
        url: "/",
        icon: "/home.svg",
      },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 1,
        title: "Khách hàng",
        url: "/customers",
        icon: "/user.svg",
      },
      {
        id: 2,
        title: "Thêm hoặc sửa khách hàng",
        url: "/customerList",
        icon: "/user.svg",
      },
      {
        id: 3,
        title: "Hàng ở kho",
        url: "/products",
        icon: "/product.svg",
      },
      {
        id: 4,
        title: "Thêm hoặc sửa hàng",
        url: "/inventory",
        icon: "/product.svg",
      },
      {
        id: 5,
        title: "Chuyến đi",
        url: "/orders",
        icon: "/order.svg",
      },
    ],
  },
];

const Menu = () => {
  const { productsLoaded, filtersLoaded, types, brands, productParams } =
    useAppSelector((state) => state.product);

  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map(
            (listItem) =>
              (user && user.roles?.includes("Admin")
                ? true
                : listItem.title === "Trang chủ" ||
                  listItem.title === "Hàng ở kho") && (
                <Link to={listItem.url} className="listItem" key={listItem.id}>
                  <img src={listItem.icon} alt="" />
                  <span className="listItemTitle">{listItem.title}</span>
                </Link>
              )
          )}
        </div>
      ))}

      <Divider
        variant="fullWidth"
        orientation="horizontal"
        sx={{ borderColor: "gray", marginBottom: 4 }}
      />

      <Grid container>
        <Paper sx={{ p: 2, mb: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          />
        </Paper>
        <Paper sx={{ p: 2 }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ types: items }))
            }
          />
        </Paper>
      </Grid>
    </div>
  );
};

export default Menu;
