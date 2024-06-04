import React, { createContext, useState } from 'react';

// context 생성
const LoginContext = createContext();

// context 내용 설정
const LoginContextProvider = ({ children }) => {
  // 변수
  const [userId, setUserId] = useState('');
  const [userPwd, setUserPwd] = useState('');

  // 반환값
  return (
    <LoginContext.Provider
      value={{
        userId,
        setUserId,
        userPwd,
        setUserPwd,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginContextProvider };
