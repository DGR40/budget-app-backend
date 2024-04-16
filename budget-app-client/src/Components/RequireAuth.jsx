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

  if (!store.loggedIn) {
    return <Navigate to="/login" />;
  }

  if (store.loggedIn) {
    if (store.username === "") {
      store.checkAuth();
    }
    return <div>{children}</div>;
  }
}
