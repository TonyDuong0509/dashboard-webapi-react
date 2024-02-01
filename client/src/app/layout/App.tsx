import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Menu from "../../components/menu/Menu";
import { ToastContainer } from "react-toastify";
import "../../styles/global.scss";

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
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
