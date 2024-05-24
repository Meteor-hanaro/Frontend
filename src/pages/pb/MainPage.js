import Header from './../../components/common/Header';
import Sidebar from './../../components/pb/Sidebar';
import Main from './../../components/pb/Main';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';

function MainPage() {
  const { isLogin } = useContext(LoginContext);

  const naviagte = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      naviagte('/pb');
    }
  }, []);

  return (
    <>
      {isLogin && (
        <>
          <Header />
          <Sidebar />
          <Main />
        </>
      )}
    </>
  );
}

export default MainPage;
