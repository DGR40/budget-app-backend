import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ExpensesPage from "./Pages/ExpensesPage";
import LoginPage from "./Pages/LogInPage";
import SignUpPage from "./Pages/SignUpPage";
import SettingsPage from "./Pages/SettingsPage";
import NotFoundPage from "./Pages/NotFoundPage";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/", element: <ExpensesPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/settings", element: <SettingsPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}
