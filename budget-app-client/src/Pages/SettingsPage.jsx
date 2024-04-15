import { useNavigate, Navigate } from "react-router-dom";
import SettingsForm from "../Components/SettingsForm";
import Header from "../Components/UI/Header";
import authStore from "../Store/authStore";
import { useEffect } from "react";
import RequireAuth from "../Components/RequireAuth";

function SettingsPage() {
  const store = authStore();

  return (
    <RequireAuth>
      <Header></Header>
      <SettingsForm />
    </RequireAuth>
  );
}

export default SettingsPage;
