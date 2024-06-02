import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function Main() {
  const [data, setData] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const pbId = 1;
  const userId = 1;

  useEffect(() => {
    axios.get('http://localhost:8080/api').then((res) => {
      setData(res.data);
      console.log(data);
    });
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setPassword('');
    setModalIsOpen(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    if (password === '1111') {
      setIsAuthenticated(true);
      closeModal();
      alert('확인되었습니다. 상담실로 입장합니다.');
      window.open(
        `./videoPage/pbId=${pbId}&userId=${userId}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      alert('비밀번호가 틀렸습니다. 다시 입력해주세요.');
      setPassword('');
    }
  };
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
                      이진만{' '}
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
                      안정투자형
                    </span>
                    <div
                      style={{
                        marginTop: '0.5px',
                        fontSize: '15px',
                        fontWeight: '700',
                        color: '#5F5F5F',
                      }}
                    >
                      최근 검사일 0000-00-00
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="enterButton"
                style={{ marginBottom: '0px' }}
                onClick={openModal}
              >
                상담 바로 입장하기
              </button>

              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Password Modal"
                className="consultingModal"
                overlayClassName="consultingModalOverlay"
              >
                <h4>상담실 입장을 위해 비밀번호 확인이 필요합니다.</h4> <br />
                <input
                  id="inputPwd"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />{' '}
                <br /> <br />
                <button
                  id="buttonCheck"
                  className="btn btn-primary"
                  onClick={handlePasswordSubmit}
                >
                  확인
                </button>
                <button
                  id="buttonCancel"
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  취소
                </button>
              </Modal>
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
                  곽준영
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
                    <span>bboyami@hana.co.kr</span>
                    <div
                      style={{
                        marginTop: '0.5px',
                      }}
                    >
                      010-0000-0000
                    </div>{' '}
                    <div
                      style={{
                        marginTop: '0.5px',
                      }}
                    >
                      퇴근 원츄
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
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#D7B863',
                }}
              >
                상담 이력
              </span>
            </div>
          </div>
        </div>
      </main>
      {/* End #main */}
    </>
  );
}

export default Main;
