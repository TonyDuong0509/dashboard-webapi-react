import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {
  customerSelectors,
  fetchCustomerAsync,
} from "../../app/slice/customerSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import "./customerDetails.scss";

const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { status: customerStatus } = useAppSelector((state) => state.customer);
  const customer = useAppSelector((state) =>
    customerSelectors.selectById(state, parseInt(id!))
  );

  useEffect(() => {
    if (!customer && id) dispatch(fetchCustomerAsync(parseInt(id)));
  }, [id, customer, dispatch]);

  if (customerStatus.includes("pending"))
    return <LoadingComponent message="Loading customer..." />;
  if (!customer) return <NotFound />;

  return (
    <div className="customerDetails">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <div className="userInfo">
              <img src="/noavatar.png" alt="" />
              <h1>{customer.fullName}</h1>
            </div>
            <Link to="/customerList">
              <button className="updateButton">
                Trở lại danh sách khách hàng
              </button>
            </Link>
          </div>
          <hr style={{ margin: 10 }} />
          <div className="details">
            <div className="item">
              <span className="itemTitle">Phone:</span>
              <span className="itemValue">{customer.phoneNumber}</span>
            </div>
            <div className="item">
              <span className="itemTitle">Địa chỉ:</span>
              <span className="itemValue">{customer.address}</span>
            </div>
            <div className="item">
              <span className="itemTitle">Mô tả:</span>
              <span className="itemValue">{customer.description}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
