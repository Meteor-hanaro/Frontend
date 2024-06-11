import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from '../../config/AxiosConfig';
import AdminPage from './AdminPage';

Modal.setAppElement('#root');

const AdminPrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [inputPassword, setInputPassword] = useState('');

  const navigate = useNavigate();

  // 사용자가 입력한 비밀번호가 일치하는지 확인
  const handleAuthentication = () => {
    axios
      .get(`/api/admin/pwdCheck`, {
        params: { inputPwd: inputPassword },
      })
      .then((response) => {
        console.log(response);
        if (response.data) {
          setIsAuthenticated(true);
          setModalIsOpen(false);
          alert('비밀번호가 일치합니다. 페이지 이동합니다...');
          navigate(`/admin`);
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

  return isAuthenticated ? (
    <AdminPage />
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
          안녕하세요, 좋은 하루입니다
          <br />
          관리자 페이지에 입장하기 위해
          <br />
          비밀번호를 입력해주세요
        </h4>
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

export default AdminPrivateRoute;
