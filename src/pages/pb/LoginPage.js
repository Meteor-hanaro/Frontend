import { LoginContext } from '../../contexts/LoginContextProvider';
import { useContext } from 'react';
import Login from '../../components/common/Login';

function LoginPage() {
  const { setUserType } = useContext(LoginContext);
  setUserType('pb');

  return <Login />;
}

export default LoginPage;
