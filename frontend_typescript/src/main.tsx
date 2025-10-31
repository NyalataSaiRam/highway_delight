import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.page.tsx";
import Details from "./pages/Details.page.tsx";
import Checkout from "./pages/Checkout.page.tsx";
import Confirmation from "./pages/Confirmation.page.js";
import PageNotFound from "./pages/PageNotFound.page.tsx";
import AppContextProvider from "./AppContextProvider.js";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/confirmation/:id",
        element: <Confirmation />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <Toaster />
    <RouterProvider router={router} />
  </AppContextProvider>
);
