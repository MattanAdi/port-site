import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Projects from "./pages/Projects.jsx";
import Music from "./pages/Music.jsx";
import CompanyDetail from "./pages/CompanyDetail.jsx";
import Layout from "./components/Layout.jsx";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Layout><App /></Layout> 
  },
  { 
    path: "/projects", 
    element: <Layout><Projects /></Layout> 
  },
  { 
    path: "/music", 
    element: <Layout><Music /></Layout> 
  },
  { 
    path: "/company/:slug", 
    element: <Layout><CompanyDetail /></Layout> 
  },
], {
  basename: process.env.NODE_ENV === 'production' ? '/port-site' : '/',
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
