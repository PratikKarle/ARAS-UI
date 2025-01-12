import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SplashScreen from "./components/Home/HomePage";
import Login from "./components/Form/Loginform";
import ShimmerUI from "./components/Shimmer";
import Grid from "./components/GridView/GridView";
import CreateForm from "./components/Form/CreateForm/CreateForm";
import EditForm from "./components/Form/EditForm/EditForm";
import InBasket from "./components/InBasket/InBasket";

// Layout component to use Outlet
function App() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

// Define the app routes
const appRouter = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
    children: [
      {
        path: "/", 
        element: (<Suspense fallback={<ShimmerUI/>}><Login/></Suspense>),
      },
      {
        path: "/home",
        element: <SplashScreen />,
      },
      {
        path: "/search/:itemType",
        element: (<Suspense fallback={<ShimmerUI/>}><Grid/></Suspense>),
      },
      {
        path: "/create/:itemType",
        element: (<Suspense fallback={<ShimmerUI/>}><CreateForm/></Suspense>),
      },
      {
        path: "/:itemType",
        element: (<Suspense fallback={<ShimmerUI/>}><EditForm/></Suspense>),
      },
      {
        path: "/InBasket",
        element: (<Suspense fallback={<ShimmerUI/>}><InBasket/></Suspense>),
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(<RouterProvider router={appRouter} />);
