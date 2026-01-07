import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import RootLayout from "./RootLayout.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";
import PortfolioPageV2 from "./pages/PortfolioPageV2.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<PortfolioPageV2 />} />
    </Route>
  )
);

export default router;
