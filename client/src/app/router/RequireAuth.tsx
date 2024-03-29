import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { toast } from "react-toastify";

interface Props {
  roles?: string[];
}

const RequireAuth = ({ roles }: Props) => {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (roles && !roles.some((x) => user.roles?.includes(x))) {
    toast.error("Not authorised to access this area");
    return <Navigate to="/products" />;
  }

  return <Outlet />;
};

export default RequireAuth;
