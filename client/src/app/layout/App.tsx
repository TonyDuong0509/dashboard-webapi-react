import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Menu from "../../components/menu/Menu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/global.scss";
import { useCallback, useEffect, useState } from "react";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../slice/basketSlice";
import { fetchCurrentUser } from "../slice/accountSlice";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  if (loading) return <LoadingComponent message="Initiasing App..." />;

  // check if being Login or Register will hidden Menu
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const showMenu = !(isLoginPage || isRegisterPage);

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <div className="main">
        <Navbar />
        <div className="container">
          {showMenu && (
            <div className="menuContainer">
              <Menu />
            </div>
          )}
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
