import { Button, Result } from "antd";
import { Suspense, lazy } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

const Dashboard = lazy(() => import("@/pages/dashboard"));
const Product = lazy(() => import("@/pages/product"));
const ProductAction = lazy(() => import("@/pages/product/action"));

function App() {
  const navigate = useNavigate();

  const element = useRoutes([
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "product",
      element: (
        <ProtectedRoute>
          <Product />
        </ProtectedRoute>
      ),
    },
    {
      path: "product/create",
      element: (
        <ProtectedRoute>
          <ProductAction />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: (
        <Result
          style={{ width: "100vw", height: "100vh" }}
          status={"404"}
          title="Halaman tidak ditemukan"
          subTitle="Halaman yang anda tuju tidak ditemukan"
          extra={
            <Button type="primary" onClick={() => navigate("/dashboard")}>
              Kembali ke Dashboard
            </Button>
          }
        />
      ),
    },
  ]);

  return <Suspense fallback="loading"> {element}</Suspense>;
}

export default App;
