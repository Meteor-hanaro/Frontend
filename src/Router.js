import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginContextProvider } from './contexts/LoginContextProvider';
import PbLoginPage from './pages/pb/LoginPage';
import PbFundPage from './pages/pb/FundPage';
import VideoPage from './pages/video/VideoPage';
import PbMainPage from './pages/pb/MainPage';
import UserLoginPage from './pages/user/LoginPage';
import UserMainPage from './pages/user/MainPage';
import AuthPage from './pages/AuthPage';
import Sign from './pages/Sign';

function Router() {
    return (
        <BrowserRouter>
            <LoginContextProvider>
                <Routes>
                    // pb
                    <Route path="/pb" element={<PbLoginPage />} />
                    <Route path="/pb/main" element={<PbMainPage />} />
                    <Route path="/pb/fund" element={<PbFundPage />} />
                    // user
                    <Route path="/user" element={<UserLoginPage />} />
                    <Route path="/user/main" element={<UserMainPage />} />
                    // WebRTC
                    <Route
                        path="/user/videoPage/:params"
                        element={<VideoPage />}
                    />
                    // Auth
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/sign" element={<Sign />} />
                </Routes>
            </LoginContextProvider>
        </BrowserRouter>
    );
}

export default Router;
