import Sidebar from "../components/SideBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRouteWrapper";
import { useEffect } from "react";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.endsWith("/user") ||
      location.pathname.endsWith("/user/")
    ) {
      navigate("./dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default User;
