import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const IdVerificationPage = ({ localVideoRef }) => {
  const { params } = useParams();
  const queryParams = new URLSearchParams(params);
  const vipId = queryParams.get('vipId');
  const captureNow = () => {
    if (localVideoRef.current) {
      const video = localVideoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const img = document.createElement('img');

      const imageData = canvas.toDataURL('image/png');
      img.src = canvas.toDataURL('image/png');
      document.getElementById('capturedScreen').innerHTML = '';
      document.getElementById('capturedScreen').appendChild(img);

      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('image', blob, 'capture.png');
        formData.append('vipId', vipId);
        // 서버로 POST 요청 보내기
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
            alert(response.data);
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('신분증 인식에 실패했습니다.');
          });
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
      </button>{' '}
      <br />
      <br />
      <div id="capturedScreen">신분증을 카메라에 가져다 대주세요.</div>
    </div>
  );
};

export default IdVerificationPage;
