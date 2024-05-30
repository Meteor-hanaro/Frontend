import React, { createContext, useState } from 'react';

// context 생성
const LoginContext = createContext();

// context 내용 설정
const LoginContextProvider = ({ children }) => {
  // 변수
  const [isLogin, setIsLogin] = useState(false);

  // 함수
  const login = () => {
    setIsLogin(true);
  };

  // 반환값
  return (
    <LoginContext.Provider value={{ login, isLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginContextProvider };
