import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Modal from 'react-modal';
import auth from '../../auth';
import ConsultCard from '../../components/user/ConsultCard';

function Main() {
  const [pb, setPb] = useState([]);
  const [vip, setVip] = useState([]);
  const [consult, setConsult] = useState([]);

  // const [data, setData] = useState('');

  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [vipId, setVipId] = useState('');
  // const [vipPwd, setVipPwd] = useState('');
  // const [pbId, setPbId] = useState('');
  // const [password, setPassword] = useState('');
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    auth
      .get(`http://${process.env.REACT_APP_BESERVERURI}/api/vip/main`)
      .then((res) => {
        console.log(res.data);
        setPb(res.data.pbInfo);
        setVip(res.data.vipInfo);
        setConsult(res.data.consultList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const clickEnterButton = () => {
    window.open(`./videoPage/:params`, '_blank', 'noopener,noreferrer');
    localStorage.setItem('isVip', vip.isvip);
  };

  //   const openModal = () => {
  //     setModalIsOpen(true);
  //   };

  //   const closeModal = () => {
  //     setPassword('');
  //     setModalIsOpen(false);
  //   };

  //   const handlePasswordChange = (e) => {
  //     setPassword(e.target.value);
  //   };

  //   const handlePasswordSubmit = (e) => {
  //     axios
  //       .post('http://127.0.0.1:8080/api/vip/main/pwdcheck', {
  //         pwd: vipPwd,
  //         writtenPwd: password,
  //       })
  //       .then((response) => {
  //         if (response.data) {
  //           setIsAuthenticated(true);
  //           closeModal();
  //           alert('확인되었습니다. 상담실로 입장합니다.');
  //           window.open(
  //             `./videoPage/20240603?pbId=${pbId}&vipId=${vipId}`,
  //             '_blank',
  //             'noopener,noreferrer'
  //           );
  //         } else {
  //           alert('비밀번호가 틀렸습니다. 다시 입력해주세요.');
  //           setPassword('');
  //         }
  //       })
  //       .catch((error) => {
  //         console.error();
  //       });
  //   };
  return (
    <>
      <main
        id="main"
        className="main"
        style={{
          padding: '45px',
          marginLeft: '5%',
          marginRight: '5%',
          height: `calc(100vh - 60px)`,
        }}
      >
        <div
          className="pagetitle alignHorizontal"
          style={{
            height: '100%',
          }}
        >
          <div
            className="alignVertical"
            style={{
              width: '35%',
            }}
          >
            <div
              className="card info-card alignVertical"
              style={{ height: '47%', padding: '7% 7%' }}
            >
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#D7B863',
                }}
              >
                VIP
              </span>
              <div
                className="alignHorizontal"
                style={{
                  marginTop: '5%',
                }}
              >
                <div style={{ fontSize: '26px', fontWeight: '540' }}>
                  <div>
                    <span style={{ fontSize: '35px', fontWeight: '750' }}>
                      {vip.name}{' '}
                    </span>
                    님<div style={{ marginTop: '3px' }}>건행하세요 😊</div>
                  </div>
                </div>
                <div>
                  <div>
                    <span
                      style={{
                        fontSize: '22px',
                        fontWeight: '550',
                        color: '#009476',
                      }}
                    >
                      {vip.riskType}
                    </span>
                    <div
                      style={{
                        marginTop: '0.5px',
                        fontSize: '15px',
                        fontWeight: '700',
                        color: '#5F5F5F',
                      }}
                    >
                      최근 검사일 {vip.riskTestDate}
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="enterButton"
                style={{ marginBottom: '0px' }}
                onClick={clickEnterButton}
              >
                상담 바로 입장하기
              </button>
            </div>
            <div
              className="card info-card alignVertical"
              style={{ height: '47%', padding: '7% 7%', marginBottom: '0px' }}
            >
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#D7B863',
                }}
              >
                PB
              </span>
              <div style={{ fontSize: '23px', fontWeight: '540' }}>
                담당{' '}
                <span style={{ fontSize: '26px', fontWeight: '750' }}>
                  {pb.name}
                </span>
              </div>
              <div
                className="alignHorizontal"
                style={{
                  height: '70%',
                  alignItems: 'center',
                }}
              >
                <div>
                  <img
                    src={process.env.PUBLIC_URL + '/assets/img/profile-img.jpg'}
                    alt="Profile"
                    className="rounded-circle"
                  />
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: '550',
                    color: '#5F5F5F',
                    marginLeft: 'auto',
                    marginRight: 'auto 0px',
                  }}
                >
                  <div>
                    <span>{pb.email}</span>
                    <div
                      style={{
                        marginTop: '0.5px',
                      }}
                    >
                      {pb.phone}
                    </div>{' '}
                    <div
                      style={{
                        marginTop: '0.5px',
                      }}
                    >
                      {pb.introduce}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: '5%', width: '60%', height: '100%' }}>
            <div
              className="card info-card"
              style={{ height: '100%', padding: '4% 4%' }}
            >
              <span
                style={{
                  marginBottom: '15px',
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#D7B863',
                }}
              >
                상담 이력
              </span>
              {consult.map((item) => (
                <ConsultCard consult={item} />
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* End #main */}
    </>
  );
}

export default Main;
