import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routers/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layout/MainLayout";
import TestAttendancePage from "./pages/TestAttendancePage";
import SignupPage from "./pages/SignupPage";
import NoticePage from "./pages/NoticePage";
import NoticeDetailPage from "./pages/NoticeDetailPage";

function App() {
  return (
    <Routes>
      {/* 공개 페이지 입니다. */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* 로그인 필요한 모든 영역 입니다. */}
      <Route element={<PrivateRoute />}>

        <Route path="/main" element={<MainLayout />}>
          <Route path="notices" element={<NoticePage />} />
          <Route path="notices/:id" element={<NoticeDetailPage />} />
        </Route>

        {/* 대쉬보드 페이지 입니다. */}
        <Route path="/test" element={<TestAttendancePage />} />

      </Route>
    </Routes>
  );
}

export default App;