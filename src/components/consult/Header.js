import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function Header({ rtcRoomNum }) {
  const location = useLocation();
  const navigate = useNavigate();

  const exit = () => {
    closeConsult(rtcRoomNum);

    const path = location.pathname;
    const role = path.split('/')[1];
    switch (role) {
      case 'pb':
        navigate(`/pb/consult/${rtcRoomNum}`);
        break;
      case 'vip':
        navigate('/vip/consult');
        break;
    }
  };

  const closeConsult = (rtcRoomNum) => {
    const url = `http://${process.env.REACT_APP_BESERVERURI}/api/consult/close`;
    const data = {
      consultId: rtcRoomNum,
    };

    axios
      .post(url, null, {
        params: data,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* ======= Header ======= */}
      <header
        id='header'
        className='header fixed-top d-flex align-items-center'
      >
        <div className='d-flex align-items-center justify-content-between'>
          <div className='logo d-flex align-items-center'>
            <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt='' />
            <span className='d-none d-lg-block'>Gold Lounge</span>
          </div>
        </div>
        {/* End Logo */}
        <nav className='header-nav ms-auto'>
          <ul className='d-flex align-items-center'>
            <li className='nav-item dropdown pe-3'>
              <div className='nav-link nav-profile d-flex align-items-center pe-0'>
                <button type='button' className='signOutBtn' onClick={exit}>
                  <i className='bi bi-box-arrow-right' /> 상담 종료
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
