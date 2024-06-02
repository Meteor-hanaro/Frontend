import React, { createContext, useState } from 'react';

// context 생성
const LoginContext = createContext();

// context 내용 설정
const LoginContextProvider = ({ children }) => {
  // 변수
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');

  // 반환값
  return (
    <LoginContext.Provider
      value={{ isLogin, setIsLogin, userName, setUserName }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginContextProvider };
