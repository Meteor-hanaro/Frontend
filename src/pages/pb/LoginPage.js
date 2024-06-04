import Login from '../../components/common/Login';

function LoginPage() {
  localStorage.setItem('userType', 'pb');
  return <Login />;
}

export default LoginPage;
