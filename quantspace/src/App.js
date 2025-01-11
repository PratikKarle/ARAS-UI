import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SplashScreen from "./components/Home/HomePage";
import Login from "./components/Form/Loginform";
import ShimmerUI from "./components/Shimmer";

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
    ],
  },
]);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(<RouterProvider router={appRouter} />);
