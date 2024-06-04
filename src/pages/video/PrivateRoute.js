import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import auth from '../../auth';
import axios from 'axios';
import WebRTCContext from '../../contexts/WebRTCContext';

Modal.setAppElement('#root');

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [vipId, setVipId] = useState('');
  const [vipName, setVipName] = useState('');
  const [vipPwd, setVipPwd] = useState('');
  const [pbId, setPbId] = useState('');
  const [consultId, setConsultId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [inputPassword, setInputPassword] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    auth
      .get(`http://${process.env.REACT_APP_BESERVERURI}/api/vip/main`)
      .then((res) => {
        setVipId(res.data.vipInfo.vipId);
        setVipPwd(res.data.vipInfo.password);
        setVipName(res.data.vipInfo.name);
        setPbId(res.data.pbInfo.pbId);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_BESERVERURI}/api/consult/extractRTCRoom?vipId=${vipId}`
      )
      .then((res) => {
        setConsultId(res.data.consultId);
      })
      .catch((e) => console.log(e));
  }, [vipId]);

  const handleAuthentication = () => {
    axios
      .post(
        `http://${process.env.REACT_APP_BESERVERURI}/api/vip/main/pwdcheck`,
        {
          pwd: vipPwd,
          writtenPwd: inputPassword,
        }
      )
      .then((response) => {
        if (response.data) {
          setIsAuthenticated(true);
          setModalIsOpen(false);
          alert('확인되었습니다. 상담실로 입장합니다.');
          navigate(`/vip/videoPage/${consultId}?pbId=${pbId}&vipId=${vipId}`);
        } else {
          alert('비밀번호가 틀렸습니다. 다시 입력해주세요.');
          setInputPassword('');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('오류가 발생했습니다. 창이 닫힙니다.');
        window.close();
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <WebRTCContext
      signaling={new WebSocket(`ws://${process.env.REACT_APP_WEBRTCWS}`)}
    >
      {children}
    </WebRTCContext>
  ) : (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          window.close();
        }}
        contentLabel="Password Modal"
        className="consultingModal"
        overlayClassName="consultingModalOverlay"
      >
        <h4>
          안녕하세요, {vipName}님!
          <br />
          상담실 입장을 위해 비밀번호 확인이 필요합니다.
        </h4>{' '}
        <br />
        <input
          id="inputPwd"
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />{' '}
        <br /> <br />
        <button
          id="buttonCheck"
          className="btn btn-primary"
          onClick={handleAuthentication}
        >
          확인
        </button>
        <button
          id="buttonCancel"
          className="btn btn-primary"
          onClick={() => {
            window.close();
          }}
        >
          취소
        </button>
      </Modal>
    </>
  );
};

export default PrivateRoute;
