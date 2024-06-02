import Header from './../../components/common/Header';
import Main from './../../components/user/Main';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';

function MainPage() {
  const { isLogin } = useContext(LoginContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate('/vip');
    }
  }, []);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default MainPage;
