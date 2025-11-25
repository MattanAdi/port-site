import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout.jsx";
import SalesOperations from "./pages/SalesOperations.jsx";

// For now, the app only shows the Employment History (SalesOperations) page.
// Other routes/components are left in the codebase but not wired up.
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Layout>
          <SalesOperations />
        </Layout>
      ),
    },
  ],
  {
    basename: process.env.NODE_ENV === "production" ? "/port-site" : "/",
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
