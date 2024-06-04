import Login from './../../components/common/Login';

function LoginPage() {
  localStorage.setItem('userType', 'vip');
  return <Login />;
}

export default LoginPage;
