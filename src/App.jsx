import { Button, Result } from "antd";
import { Suspense, lazy } from "react";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Paths } from "./routes/paths";
import NDLoading from "./components/NDLoading";

const Banner = lazy(() => import("@/pages/content/banner"));
const BannerAction = lazy(() => import("@/pages/content/banner/action"));
const Promo = lazy(() => import("@/pages/content/promo"));
const PromoAction = lazy(() => import("@/pages/content/promo/action"));
const Feature = lazy(() => import("@/pages/content/feature"));
const FeatureAction = lazy(() => import("@/pages/content/feature/action"));
const Footer = lazy(() => import("@/pages/content/footer"));
const FooterAction = lazy(() => import("@/pages/content/footer/action"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Order = lazy(() => import("@/pages/order"));
const OrderDetail = lazy(() => import("@/pages/order/detail"));
const Product = lazy(() => import("@/pages/product"));
const ProductAction = lazy(() => import("@/pages/product/action"));
const MasterBrand = lazy(() => import("@/pages/master/brand"));
const MasterBrandAction = lazy(() => import("@/pages/master/brand/action"));
const MasterPayment = lazy(() => import("@/pages/master/payment"));
const MasterPaymentAction = lazy(() => import("@/pages/master/payment/action"));
const Login = lazy(() => import("@/pages/login"));

function App() {
  const navigate = useNavigate();

  const element = useRoutes([
    { path: "/", element: <Navigate to={Paths.DASHBOARD} /> },
    {
      path: Paths.LOGIN,
      element: <Login />,
    },
    {
      path: Paths.MASTER_CONTENT_BANNER,
      element: (
        <ProtectedRoute>
          <Banner />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.MASTER_CONTENT_BANNER_ACTION,
      element: (
        <ProtectedRoute>
          <BannerAction />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.MASTER_CONTENT_PROMO,
      element: (
        <ProtectedRoute>
          <Promo />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.MASTER_CONTENT_PROMO_ACTION,
      element: (
        <ProtectedRoute>
          <PromoAction />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.MASTER_CONTENT_FEATURE,
      element: (
        <ProtectedRoute>
          <Feature />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.MASTER_CONTENT_FEATURE_ACTION,
      element: (
        <ProtectedRoute>
          <FeatureAction />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.MASTER_CONTENT_FOOTER,
      element: (
        <ProtectedRoute>
          <Footer />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.MASTER_CONTENT_FOOTER_ACTION,
      element: (
        <ProtectedRoute>
          <FooterAction />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.DASHBOARD,
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.ORDER,
      element: (
        <ProtectedRoute>
          <Order />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.ORDER_DETAIL,
      element: (
        <ProtectedRoute>
          <OrderDetail />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.PRODUCT,
      element: (
        <ProtectedRoute>
          <Product />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.PRODUCT_ACTION,
      element: (
        <ProtectedRoute>
          <ProductAction />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.PRODUCT_ACTION_UPDATE,
      element: (
        <ProtectedRoute>
          <ProductAction />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.MASTER_BRAND,
      element: (
        <ProtectedRoute>
          <MasterBrand />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.MASTER_BRAND_ACTION,
      element: (
        <ProtectedRoute>
          <MasterBrandAction />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.MASTER_BRAND_ACTION_UPDATE,
      element: (
        <ProtectedRoute>
          <MasterBrandAction />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.MASTER_PAYMENT,
      element: (
        <ProtectedRoute>
          <MasterPayment />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.MASTER_PAYMENT_ACTION,
      element: (
        <ProtectedRoute>
          <MasterPaymentAction />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.MASTER_PAYMENT_ACTION_UPDATE,
      element: (
        <ProtectedRoute>
          <MasterPaymentAction />
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

  return <Suspense fallback={<NDLoading />}> {element}</Suspense>;
}

export default App;
