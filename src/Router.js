import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginContextProvider } from './contexts/LoginContextProvider';
import PbLoginPage from './pages/pb/LoginPage';
import PbFundPage from './pages/pb/FundPage';
import VideoPage from './pages/video/VideoPage';
import PbMainPage from './pages/pb/MainPage';
import PbPortfolioPage from './pages/pb/PortfolioPage';
import UserLoginPage from './pages/user/LoginPage';
import UserMainPage from './pages/user/MainPage';
import PrivateRoute from './pages/video/PrivateRoute';
import SuggestionPage from './pages/pb/SuggestionPage';

function Router() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          {/* pb */}
          <Route path="/pb" element={<PbLoginPage />} />
          <Route path="/pb/main" element={<PbMainPage />} />
          <Route path="/pb/fund" element={<PbFundPage />} />
          <Route path="/pb/portfolio" element={<PbPortfolioPage />} />
          <Route path="/pb/suggestion/:vipId" element={<SuggestionPage />} />
          {/* <Route path="/pb/videoPage/:params" element={<VideoPage />} /> */}
          {/* vip */}
          <Route path="/vip" element={<UserLoginPage />} />
          <Route path="/vip/main" element={<UserMainPage />} />
          {/* WebRTC */}
          <Route
            path="/vip/videoPage/:params"
            element={
              <PrivateRoute>
                <VideoPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default Router;
