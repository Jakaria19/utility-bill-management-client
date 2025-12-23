import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
import Home from "../src/pages/Home/Home";
import AllBills from "./pages/AddBill/AddBill";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MyPayments from "./pages/MyBills/MyBills";
import PrivateRoute from "./Private/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/bills", element: <AllBills /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/my-payments",
        element: (
          <PrivateRoute>
            <MyPayments />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

// import "./App.css";

// function App() {
//   return (
//     <>
//     </>
//   );
// }

// export default App;
