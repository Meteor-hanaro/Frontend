import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PbLoginPage from './pages/pb/LoginPage';
import PbFundPage from './pages/pb/FundPage';
import VideoPage from "./pages/video/VideoPage";
import PbMainPage from './pages/pb/MainPage';
import PbPortfolioPage from './pages/pb/PortfolioPage';
import UserLoginPage from './pages/user/LoginPage';
import UserMainPage from './pages/user/MainPage';
import AuthPage from './pages/AuthPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        // pb
        <Route path="/pb" element={<PbLoginPage />} />
        <Route path="/pb/main" element={<PbMainPage />} />
        <Route path="/pb/portfolio" element={<PbPortfolioPage />} />
        <Route path="/pb/fund" element={<PbFundPage />} />
        // user
        <Route path="/user" element={<UserLoginPage />} />
        <Route path="/user/main" element={<UserMainPage />} />
        // WebRTC
        <Route path="/videoPage" element={<VideoPage />} />
        // Auth
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;