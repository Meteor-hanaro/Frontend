import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../auth';

function Header() {
  const [userType, setUserType] = useState(() =>
    localStorage.getItem('userType')
  );
  const [userName, setUserName] = useState(() =>
    localStorage.getItem('userName')
  );

  const navigate = useNavigate();
  const handleLogout = () => {
    const url =
      `http://${process.env.REACT_APP_BESERVERURI}/api/` + userType + '/logout';
    auth
      .post(url, null, null)
      .then((res) => {
        console.log(res);

        setTimeout(() => {
          navigate('/' + userType);
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
    <>
      {/* ======= Header ======= */}
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="" />
            <span className="d-none d-lg-block">Gold Lounge</span>
          </a>
        </div>
        {/* End Logo */}
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <div className="nav-link nav-profile d-flex align-items-center pe-0">
                <span className="d-none d-md-block ps-2">{userName}</span>
                <button
                  type="button"
                  className="signOutBtn"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right" /> Sign Out
                </button>
              </div>
              {/* End Profile Iamge Icon */}
            </li>
            {/* End Profile Nav */}
          </ul>
        </nav>
        {/* End Icons Navigation */}
      </header>
      {/* End Header */}
    </>
  );
}

export default Header;
