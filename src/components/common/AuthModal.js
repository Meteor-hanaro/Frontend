import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function AuthModal({ show, handleClose, authResult }) {
  return (
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
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.78 11.03a.75.75 0 0 0 1.06-1.06L6.525 8.7l.455-.455 1.3 1.3a.75.75 0 0 0 1.06-1.06L7.03 7.22a.75.75 0 0 0-1.06 0L5.06 8.13l-.265-.264a.75.75 0 1 0-1.06 1.06l1 1z" />
            </svg>
          </div>
          <h2 className="modal-title">
            GoldRounge
          </h2>
          <p className="modal-message">
            {authResult ? '본인 인증이 완료되었습니다.' : '인증에 실패했습니다. 다시 시도해주세요.'}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose} className="close-modal-button">
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AuthModal;