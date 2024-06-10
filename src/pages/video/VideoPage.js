import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import WebRTC from './WebRTC';
import Header from '../../components/consult/Header';

const VideoPage = () => {
  const [signaling, setSignaling] = useState(null);
  const sendMessageRef = useRef(null);

  const params = useParams();

  useEffect(() => {
    const ws = new WebSocket(
      `${process.env.REACT_APP_SIGNALINGWS}/${params.params}`
    );
    ws.onopen = () => {
      console.log('Connected to signaling server');
    };
    setSignaling(ws);

    // 권한 초기화
    localStorage.removeItem('isVip');
    localStorage.removeItem('isPb');
    localStorage.removeItem('pbVip');

    return () => {
      ws.close();
    };
  }, []);

  const handleSendMessage = (sendMessage) => {
    sendMessageRef.current = sendMessage;
  };

  return (
    <>
      <Header rtcRoomNum={params.params} />
      <div className='VideoPage' style={{ marginTop: '60px' }}>
        <div id='videoContainer'>
          {signaling && (
            <WebRTC
              signaling={signaling}
              onSendMessage={handleSendMessage}
              rtcRoomNum={params.params}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default VideoPage;
