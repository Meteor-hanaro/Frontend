import { useState } from 'react';
import Login from './../../components/common/Login';

function LoginPage() {
  const [type, setType] = useState('vip');

  return <Login type={type} />;
}

export default LoginPage;
