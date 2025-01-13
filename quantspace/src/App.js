import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SplashScreen from "./components/Home/HomePage";
import ShimmerUI from "./components/Shimmer";

const Login = lazy(() => import('./components/Form/Loginform'));
const CreateForm = lazy(() => import('./components/Form/CreateForm/CreateForm'));
const EditForm = lazy(() => import('./components/Form/EditForm/EditForm'));
const InBasket = lazy(() => import('./components/InBasket/InBasket'));
const Grid = lazy(() => import('./components/GridView/GridView'));

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
