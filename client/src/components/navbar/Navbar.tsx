import { ShoppingCart } from "@mui/icons-material";
import { IconButton, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useAppSelector } from "../../app/store/configureStore";

// const rightLinks = [
//   { title: "login", path: "/login" },
//   { title: "register", path: "/register" },
// ];

const Navbar = () => {
  const { basket } = useAppSelector((state) => state.basket);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/vietphil247.jpeg" alt="" />
        <Link to={"/"}>
          <h1>VietPhil247</h1>
        </Link>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>

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
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>Francis</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
