import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginContextProvider } from './contexts/LoginContextProvider';
import RootPage from './pages/RootPage';
import PbLoginPage from './pages/pb/LoginPage';
import PbFundPage from './pages/pb/FundPage';
import VideoPage from './pages/video/VideoPage';
import PbMainPage from './pages/pb/MainPage';
import PbPortfolioPage from './pages/pb/PortfolioPage';
import UserLoginPage from './pages/user/LoginPage';
import UserMainPage from './pages/user/MainPage';
import PrivateRoute from './pages/video/PrivateRoute';
import SuggestionPage from './pages/pb/SuggestionPage';
import AdminPage from './pages/system_admin/AdminPage';
import AdminPrivateRoute from './pages/system_admin/AdminPrivateRoute';
import SuggestionAddPage from './pages/pb/SuggestionAddPage';
import PbConsultEndingPage from './pages/pb/ConsultEndingPage';
import UserConsultEndingPage from './pages/user/ConsultEndingPage';
import ConsultDetailPage from './pages/user/ConsultDetailPage';

function Router() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          {/* root */}
          <Route path='/' element={<RootPage />} />
          {/* pb */}
          <Route path='/pb' element={<PbLoginPage />} />
          <Route path='/pb/main' element={<PbMainPage />} />
          <Route path='/pb/fund' element={<PbFundPage />} />
          <Route path='/pb/portfolio' element={<PbPortfolioPage />} />
          <Route path='/pb/suggestion/:vipId' element={<SuggestionPage />} />
          <Route path='/pb/suggestion/add' element={<SuggestionAddPage />} />
          <Route path='/pb/consult' element={<PbConsultEndingPage />} />
          {/* vip */}
          <Route path='/vip' element={<UserLoginPage />} />
          <Route path='/vip/main' element={<UserMainPage />} />
          <Route path='/vip/consult' element={<UserConsultEndingPage />} />
          <Route
            path='/vip/consult/:consultId'
            element={<ConsultDetailPage />}
          />
          {/* WebRTC */}
          <Route
            path='/vip/videoPage/:params'
            element={
              <PrivateRoute>
                <VideoPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/pb/videoPage/:params'
            element={
              <PrivateRoute>
                <VideoPage />
              </PrivateRoute>
            }
          />
          {/* System Admin */}
          <Route
            path='/admin'
            element={
              <AdminPrivateRoute>
                <AdminPage />
              </AdminPrivateRoute>
            }
          />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default Router;
