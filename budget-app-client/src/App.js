import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ExpensesPage from "./Pages/ExpensesPage";
import LoginPage from "./Pages/LogInPage.js";
import SignUpPage from "./Pages/SignUpPage";
import SettingsPage from "./Pages/SettingsPage";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/expenses", element: <ExpensesPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/settings", element: <SettingsPage /> },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}
