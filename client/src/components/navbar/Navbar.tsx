import { ShoppingCart } from "@mui/icons-material";
import {
  IconButton,
  Badge,
  List,
  ListItem,
  Fade,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import "./navbar.scss";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { signOut } from "../../app/slice/accountSlice";
import React from "react";
import { clearBasket } from "../../app/slice/basketSlice";

const rightLinks = [{ title: "login", path: "/login" }];

const navLinkStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to={"/"}>
          <img src="/vietphil247.jpeg" alt="" />
        </Link>
        <Link to={"/"}>
          <h1>VietPhil247</h1>
        </Link>
      </div>
      {user ? (
        <div className="icons">
          <div className="basket">
            <IconButton
              component={Link}
              to="/basket"
              size="large"
              edge="start"
              color="inherit"
            >
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>

          <div className="user">
            <img
              src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
              alt=""
            />
            <span>{user?.email}</span>
          </div>
          <IconButton onClick={handleClick}>
            <img src="/settings.svg" alt="" className="icon" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem component={Link} to="/orders">
              My orders
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(signOut());
                dispatch(clearBasket());
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <List sx={{ display: "flex" }}>
          {rightLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navLinkStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Navbar;
