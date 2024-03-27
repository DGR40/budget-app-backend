import authStore from "../Store/authStore";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RequireAuth({ children }) {
  const store = authStore();
  const navigate = useNavigate;

  useEffect(() => {
    if (store.loggedIn === null) {
      store.checkAuth();
    }
  }, []);

  if (store.loggedIn === null) {
    return <div>Loading</div>;
  }

  console.log("CURRENT loggedIn state", store.loggedIn);

  if (!store.loggedIn) {
    console.log("store.loggedIn is false");
    return <Navigate to="/login" />;
  }
  return <div>{children}</div>;
}
