import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PbLoginPage from './pages/pb/LoginPage';
import VideoPage from "./pages/video/VideoPage";
import PbMainPage from './pages/pb/MainPage';
import UserLoginPage from './pages/user/LoginPage';
import UserMainPage from './pages/user/MainPage';
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        // pb
        <Route path="/pb" element={<PbLoginPage />} />
        <Route path="/pb/main" element={<PbMainPage />} />
        // user
        <Route path="/user" element={<UserLoginPage />} />
        <Route path="/user/main" element={<UserMainPage />} />
        // WebRTC
        <Route path="/videoPage" element={<VideoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;