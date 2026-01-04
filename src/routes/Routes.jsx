import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MyBills from "../pages/MyBills/MyBills";
import PrivateRoute from "../Private/PrivateRoute";
import Bills from "../pages/Bills/Bills";
import BillDetails from "../pages/BillDetails/BillDetails";
import AddBill from "../pages/AddBill/AddBill";
import Profile from "../pages/Profile/Profile";
import Error from "../pages/Error/Error";
import About from "../pages/About/About";
import Help from "../pages/Help/Help";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "bills", element: <Bills /> },
      { path: "about", element: <About /> },
      { path: "help", element: <Help /> },
      {
        path: "bill-details/:id",
        element: (
          <PrivateRoute>
            <BillDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "my-history", element: <MyBills /> },
      { path: "add-bill", element: <AddBill /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);
