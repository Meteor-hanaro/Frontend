import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AuthModal from '../../components/common/AuthModal';
import { Button, Modal } from 'react-bootstrap';

const IdVerificationPage = ({ localVideoRef, rtcRoomNum }) => {
  const ws = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [authResult, setAuthResult] = useState(null);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const pbId = query.get('pbId');
  const vipId = query.get('vipId');

  useEffect(() => {
    ws.current = new WebSocket(
      `${process.env.REACT_APP_SUGGESTIONLISTWS}/${rtcRoomNum}`
    );

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.current.onmessage = (event) => {
      try {
        console.log('Message from server:', event);
        if (event.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = function (loadEvent) {
            const imageDataUrl = loadEvent.target.result;
            const img = document.createElement('img');
            img.src = imageDataUrl;
            document.getElementById('capturedScreen').innerHTML = '';
            document.getElementById('capturedScreen').appendChild(img);
          };
          reader.readAsDataURL(event.data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);
  const handleClose = () => setShowModal(false);
  const captureNow = () => {
    if (localVideoRef.current) {
      const video = localVideoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL('image/png');
      const img = document.createElement('img');
      img.src = imageData;
      document.getElementById('capturedScreen').innerHTML = '';
      document.getElementById('capturedScreen').appendChild(img);

      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('image', blob, 'capture.png');
        formData.append('vipId', vipId);

        axios
          .post(
            `http://${process.env.REACT_APP_BESERVERURI}/api/id/ocr`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          .then((response) => {
            console.log('Success:', response.data);
            if (response.data == '인증에 성공했습니다.') {
              setAuthResult(true);
            } else {
              setAuthResult(false);
            }
            setShowModal(true);
          })
          .catch((error) => {
            console.error('Error:', error);
            setAuthResult(false);
            setShowModal(true);
          });

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          const reader = new FileReader();
          reader.onload = function (event) {
            const arrayBuffer = event.target.result;
            ws.current.send(arrayBuffer);
            console.log('Image sent via WebSocket');
          };
          reader.readAsArrayBuffer(blob);
        }
      }, 'image/png');
    } else {
      alert('local video is not available.');
    }
  };

  return (
    <div id="divIdVerification">
      <button
        onClick={captureNow}
        id="captureButton"
        className="btn btn-primary"
      >
        신분증촬영
      </button>
      <br />
      <br />
      <div id="capturedScreen">신분증을 카메라에 가져다 대주세요.</div>
      <AuthModal
        show={showModal}
        handleClose={handleClose}
        authResult={authResult}
      />
    </div>
  );
};

export default IdVerificationPage;
