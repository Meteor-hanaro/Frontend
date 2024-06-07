import React, { useState } from "react";
import useScript from "../etc/useScript";
import { useParams } from 'react-router-dom';
import { Button, Modal } from "react-bootstrap";

function AuthPage() {
  const { params } = useParams();
  const queryParams = new URLSearchParams(params);
  const vipId = queryParams.get('vipId');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  useScript("https://code.jquery.com/jquery-1.12.4.min.js");
  useScript("https://cdn.iamport.kr/js/iamport.payment-1.2.0.js");
  const certify = () => {
    const { IMP } = window;
    IMP.init("imp74352341");
    IMP.certification(
      {
        merchant_uid: vipId,
        popup: true,
      },
      (rsp) => {
        if (rsp.success) {
          // alert("인증되었습니다.");
          setShow(true);
          console.log(rsp);
        } else {
          alert(`인증에 실패했습니다. 에러: ${rsp.error_msg}`);
        }
      }
    );
  };

  return (
    <div className="AuthPage justify-content-center">
      <div id="auth-box" className="d-flex align-items-center">
        <div id="icons-box">   
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_KB.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_NAVER.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_KAKAOBANK.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_KAKAO.png?v=20240122" /></div>
        </div>
        <div id="icons-box">   
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_PASS.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_HANA.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_SAMSUNG.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_SHINHAN.png?v=20240122" /></div>
        </div>
        <div id="icons-box">   
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_TOSS.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_PAYCO.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_KFTC.png?v=20240122" /></div>
        </div>
        <div id="middle-box">
          <button className="btn btn-auth" onClick={certify}>간편인증</button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="modal-body">
          <div className="modal-content">
          <div className="modal-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fill="currentColor"
                className="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
              >8
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.78 11.03a.75.75 0 0 0 1.06-1.06L6.525 8.7l.455-.455 1.3 1.3a.75.75 0 0 0 1.06-1.06L7.03 7.22a.75.75 0 0 0-1.06 0L5.06 8.13l-.265-.264a.75.75 0 1 0-1.06 1.06l1 1z" />
              </svg>
            </div>
            <h2 className="modal-title">본인인증 완료!</h2>
            <p className="modal-message">본인 인증이 완료되었습니다.</p>
          </div>
        </Modal.Body> 
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} className="close-modal-button">
            확인
          </Button>
        </Modal.Footer>
      </Modal>  
    </div>
  );
}

export default AuthPage;
