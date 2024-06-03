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

// 2차 솔티캐빈
// 가원: 5500
// 지연: 6500
// 하영: 6500
// 상민: 6500
// 주혜: 5000

// 현선이네
// 인당 18000원