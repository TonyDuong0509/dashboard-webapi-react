import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";

const SideBar = () => {
  const { user } = useAppSelector((state) => state.account);

  const menu = [
    {
      id: 1,
      title: "main",
      listItems: [
        {
          id: 1,
          title: "Homepage",
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
          title: "Users",
          url: "/users",
          icon: "/user.svg",
        },
        {
          id: 2,
          title: "Products",
          url: "/products",
          icon: "/product.svg",
        },
        {
          id: 3,
          title: "Orders",
          url: "/orders",
          icon: "/order.svg",
        },
      ],
    },
  ];

  // if wasn't loged in, just display menu for Products
  const filteredMenu = user
    ? menu
    : menu.filter(
        (item) =>
          item.title === "lists" &&
          item.listItems.some((li) => li.title === "Products")
      );

  return (
    <div className="sidebar">
      {filteredMenu.map((item) => (
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
    </div>
  );
};

export default SideBar;
