import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { OrderProvider } from "./pages/user/OrderContext";

const Accept = lazy(() => import("./components/admin/Accept"));
const AcceptDetail = lazy(() => import("./components/admin/AcceptDetail"));
const Ask = lazy(() => import("./components/admin/Ask"));
const AskDetail = lazy(() => import("./components/admin/AskDetail"));
const CategorySetting = lazy(
  () => import("./components/admin/CategorySetting"),
);
const Report = lazy(() => import("./components/admin/Report"));
const ReportDetail = lazy(() => import("./components/admin/ReportDetail"));
const StatisticsforAdmin = lazy(
  () => import("./components/admin/StatisticsforAdmin"),
);
const CeoWithdrawal = lazy(() => import("./components/ceo/CeoWithdrawal"));
const Home = lazy(() => import("./components/ceo/Home"));
const LoginPageforCEO = lazy(() => import("./components/ceo/LogintestforCeo"));
const MenuManagement = lazy(() => import("./components/ceo/MenuManagement"));
const OrdersAccepted = lazy(() => import("./components/ceo/OrdersAccepted"));
const OrdersDetail = lazy(() => import("./components/ceo/OrdersDetail"));
const OrdersHistory = lazy(() => import("./components/ceo/OrdersHistory"));
const Reviews = lazy(() => import("./components/ceo/Reviews"));
const Statistics = lazy(() => import("./components/ceo/Statistics"));
const StatisticsforCeo = lazy(
  () => import("./components/ceo/StatisticsforCeo"),
);
const StoreManagement = lazy(() => import("./components/ceo/StoreManagement"));
const AdminLayout = lazy(() => import("./components/layout/AdminLayout"));
const CeoLayout = lazy(() => import("./components/layout/CeoLayout"));
const MypageLayout = lazy(() => import("./components/layout/MypageLayout"));
const RootLayout = lazy(() => import("./components/layout/RootLayout"));
const MyPageOrderCloseDetail = lazy(
  () => import("./components/user/mypage/MyPageOrderCloseDetail"),
);
const AuthCeoPage = lazy(() => import("./pages/AuthCeoPage.tsx"));
const AuthPage = lazy(() => import("./pages/AuthPage.tsx"));
const AuthUserPage = lazy(() => import("./pages/AuthUserPage.tsx"));
const CeoPage = lazy(() => import("./pages/CeoPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const MyPage = lazy(() => import("./pages/MyPage.tsx"));
const MyPageAddress = lazy(() => import("./pages/MyPageAddress"));
const MyPageCouponPage = lazy(() => import("./pages/MyPageCouponPage"));
const MyPageFavoriteListPage = lazy(
  () => import("./pages/MyPageFavoriteListPage"),
);
const MyPageOrderClosePage = lazy(() => import("./pages/MyPageOrderClosePage"));
const MyPageOrderPage = lazy(() => import("./pages/MyPageOrderPage.tsx"));
const MyPageOrderPagee = lazy(() => import("./pages/MyPageOrderPagee"));
const MyPageReportListPage = lazy(() => import("./pages/MyPageReportListPage"));
const MyPageReviewPage = lazy(() => import("./pages/MyPageReviewPage"));
const MypageReportDetailPage = lazy(
  () => import("./pages/MypageReportDetailPage"),
);
const MypageReportPage = lazy(() => import("./pages/MypageReportPage"));
const MypageUserWithdrawal = lazy(() => import("./pages/MypageUserWithdrawal"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PaymentPage = lazy(() => import("./pages/PaymentPage.jsx"));
const ProjectInfo = lazy(() => import("./pages/ProjectInfo.jsx"));
const SnsLoginPage = lazy(() => import("./pages/SnsLoginPage"));
const IntroPage = lazy(() => import("./pages/intro/IntroPage"));
const RestaurantDetailPage2 = lazy(
  () => import("./pages/user/RestaurantDetailPage2"),
);
const RestaurantsPage = lazy(() => import("./pages/user/main/RestaurantsPage"));

function App() {
  return (
    <OrderProvider>
      <div className="root-wrap">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* 로그인 및 회원가입 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth">
              <Route index element={<AuthPage />} />
              <Route path="user" element={<AuthUserPage />} />
              <Route path="ceo" element={<AuthCeoPage />} />
            </Route>
            <Route path="/oauth/redirect" element={<SnsLoginPage />} />

            {/* 유저 */}
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="restaurant/:id" element={<RestaurantsPage />} />
              <Route
                path="restaurants/:id"
                element={<RestaurantDetailPage2 />}
              />
              <Route path="payment/:id" element={<PaymentPage />} />
              <Route path="projectinfo" element={<ProjectInfo />} />
            </Route>

            {/* 마이페이지 */}
            <Route path="/mypage" element={<MypageLayout />}>
              <Route index element={<MyPage />} />
              <Route path="order">
                <Route path=":id" element={<MyPageOrderPage />} />
                <Route index element={<MyPageOrderPagee />} />
              </Route>
              <Route path="report">
                <Route index element={<MyPageReportListPage />} />
                <Route
                  path="details/:id"
                  element={<MypageReportDetailPage />}
                />
              </Route>
              <Route path="orderclose">
                <Route index element={<MyPageOrderClosePage />} />
                <Route path=":id" element={<MyPageOrderCloseDetail />} />
              </Route>
              <Route path="review" element={<MyPageReviewPage />} />
              <Route path="address" element={<MyPageAddress />} />
              <Route path="withdrawal" element={<MypageUserWithdrawal />} />
              <Route path="coupon" element={<MyPageCouponPage />} />
              <Route path="favorite" element={<MyPageFavoriteListPage />} />
            </Route>

            {/* 사업자 */}
            <Route path="/ceopage" element={<CeoLayout />}>
              <Route index element={<CeoPage />} />
              <Route path="home" element={<Home />} />
              <Route path="login" element={<LoginPageforCEO />} />
              <Route path="orders-accepted" element={<OrdersAccepted />} />
              <Route path="orders-history" element={<OrdersHistory />} />
              <Route
                path="orders/details/:doneOrderPk"
                element={<OrdersDetail />}
              />
              <Route path="reviews" element={<Reviews />} />
              <Route path="store-management" element={<StoreManagement />} />
              <Route path="menu-management" element={<MenuManagement />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="statisticsforCeo" element={<StatisticsforCeo />} />
              <Route path="withdraw" element={<CeoWithdrawal />} />
            </Route>

            {/* 관리자 */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Accept />} />
              <Route path="category-setting" element={<CategorySetting />} />
              <Route path="statistics" element={<StatisticsforAdmin />} />
              <Route path="ask">
                <Route index element={<Ask />} />
                <Route path="details/:id" element={<AskDetail />} />
              </Route>
              <Route path="report">
                <Route index element={<Report />} />
                <Route path="details/:report_pk" element={<ReportDetail />} />
              </Route>
              <Route path="accept">
                <Route index element={<Accept />} />
                <Route path="details/:resPk" element={<AcceptDetail />} />
              </Route>
            </Route>

            {/* 공통 */}
            <Route path="*" element={<NotFound />} />
            <Route path="/intro" element={<IntroPage />} />
          </Routes>
        </Suspense>
      </div>
    </OrderProvider>
  );
}

export default App;
