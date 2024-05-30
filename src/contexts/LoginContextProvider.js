import React, { createContext, useEffect, useState } from 'react';

// context 생성
const LoginContext = createContext();

// context 내용 설정
const LoginContextProvider = ({ children }) => {
  // 변수
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  // 함수
  const login = () => {
    setIsLogin(true);
  };

  // 반환값
  return (
    <LoginContext.Provider value={{ type, login, email, password, isLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginContextProvider };
