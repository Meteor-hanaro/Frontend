import { LoginContext } from '../../contexts/LoginContextProvider';
import { useContext } from 'react';
import Login from './../../components/common/Login';

function LoginPage() {
  const { setUserType } = useContext(LoginContext);
  setUserType('vip');

  return <Login />;
}

export default LoginPage;
