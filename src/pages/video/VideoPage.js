import React, { useEffect, useState, useRef } from 'react';
import WebRTC from './WebRTC';

const VideoPage = () => {
  const [signaling, setSignaling] = useState(null);
  const sendMessageRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://${process.env.REACT_APP_WEBRTCWS}`);
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
    <div className="VideoPage">
      <div id="videoContainer">
        {signaling && (
          <WebRTC signaling={signaling} onSendMessage={handleSendMessage} />
        )}
      </div>
    </div>
  );
};

export default VideoPage;
