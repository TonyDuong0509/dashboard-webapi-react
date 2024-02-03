import { Link } from "react-router-dom";
import "./Menu.scss";
import { menu } from "../../data";
import { Divider, Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import {
  fetchProductsAsync,
  fetchFilters,
  setProductParams,
} from "../../app/slice/productSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import CheckboxButtons from "../checkboxButtons/CheckboxButtons";

const Menu = () => {
  const {
    productsLoaded,
    filtersLoaded,
    types,
    brands,
    isGone,
    productParams,
  } = useAppSelector((state) => state.product);
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
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} className="listItem" key={listItem.id}>
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
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
        <Paper sx={{ p: 2, mb: 2 }}>
          <CheckboxButtons
            items={isGone}
            checked={productParams.isGone}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ isGone: items }))
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
