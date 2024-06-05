import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(() =>
    localStorage.getItem('userType')
  );
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const url =
      `http://${process.env.REACT_APP_BESERVERURI}/api/` + userType + '/login';
    const data = {
      email: email,
      password: password,
    };

    axios
      .post(url, null, {
        params: data,
      })
      .then((res) => {
        console.log(res);
        // localStorage에 jwt token 저장
        localStorage.setItem('userName', res.data.userName);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);

        setTimeout(() => {
          navigate('/' + userType + '/main');
        }, 1000);
      })
      .catch((error) => {
        const code = error.response.data.code;
        if (code == 4400) {
          alert('존재하지 않은 사용자입니다.');
        }
      });
  };

  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="pt-4 pb-2">
                <div className="d-flex flex-column align-items-center">
                  <h5 className="card-title text-center pb-0 fs-4">
                    우리는 더 나은 내일을 만듭니다.
                  </h5>
                  <p className="text-center small">
                    We create a better tomorrow.
                  </p>
                </div>
              </div>
              {/* End Logo */}
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <div className="d-flex flex-column align-items-center">
                      <div className="logo d-flex align-items-center w-auto">
                        <div className="card-title text-center pb-0 fs-4">
                          <span>Gold Lounge</span>
                        </div>
                      </div>
                      <p className="text-center small">
                        Enter your E-MAIL &amp; PW to login
                      </p>
                    </div>
                  </div>
                  <form className="row g-3 needs-validation" noValidate="">
                    <div className="col-12">
                      <label htmlFor="yourUsername" className="form-label">
                        E-MAIL
                      </label>
                      <div className="input-group has-validation">
                        <input
                          type="text"
                          name="username"
                          className="form-control"
                          id="yourUsername"
                          required=""
                          onChange={handleEmailChange}
                        />
                        <div className="invalid-feedback">
                          Please enter your username.
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="yourPassword" className="form-label">
                        PW
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="yourPassword"
                        required=""
                        onChange={handlePasswordChange}
                      />
                      <div className="invalid-feedback">
                        Please enter your password!
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100"
                        type="button"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
