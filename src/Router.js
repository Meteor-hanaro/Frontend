import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/user/MainPage';
import LoginPage from './pages/user/LoginPage';
import ProfilePage from './pages/ProfilePage';
import FormPage from './pages/FormPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/formPage" element={<FormPage />} />
        <Route path="/pb/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
