// import { createBrowserRouter } from "react-router";
// import RootLayouts from "../components/layouts/RootLayouts";
// import Home from "../pages/Home/Home";
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
// import MyBills from "../pages/MyBills/MyBills";
// import PrivateRoute from "../Private/PrivateRoute";
// import Bills from "../pages/Bills/Bills";
// import BillDetails from "../pages/BillDetails/BillDetails";
// import AddBill from "../pages/AddBill/AddBill";
// import Profile from "../pages/Profile/Profile";
// import Error from "../pages/Error/Error";
// import About from "../pages/About/About";
// import Help from "../pages/Help/Help";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: RootLayouts,
//     errorElement: <Error></Error>,
//     children: [
//       {
//         index: true,
//         Component: Home,
//       },
//       {
//         path: "/login",
//         Component: Login,
//       },
//       {
//         path: "/register",
//         Component: Register,
//       },
//       {
//         path: "/bills",
//         Component: Bills,
//       },
//       {
//         path: "/about",
//         Component: About,
//       },
//       {
//         path: "/help",
//         Component: Help,
//       },
//       {
//         path: "/my-bills",
//         element: (
//           <PrivateRoute>
//             <MyBills></MyBills>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/profile",
//         element: (
//           <PrivateRoute>
//             <Profile></Profile>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/add-bill",
//         element: (
//           <PrivateRoute>
//             <AddBill></AddBill>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/bill-details/:id",
//         element: (
//           <PrivateRoute>
//             <BillDetails></BillDetails>
//           </PrivateRoute>
//         ),
//       },
//     ],
//   },
// ]);

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
        path: "my-bills",
        element: (
          <PrivateRoute>
            <MyBills />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "add-bill",
        element: (
          <PrivateRoute>
            <AddBill />
          </PrivateRoute>
        ),
      },
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
]);
