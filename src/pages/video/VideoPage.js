import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import WebRTC from './WebRTC';

const VideoPage = () => {
  const [signaling, setSignaling] = useState(null);
  const sendMessageRef = useRef(null);

  const params = useParams();
  // const query = new URLSearchParams(useLocation().search);

  useEffect(() => {  
    // const pbId = query.get('pbId');
    // const vipId = query.get('vipId');
    
    const ws = new WebSocket(
      `ws://${process.env.REACT_APP_WEBRTCWS}/${params.params}`
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
    <div className="VideoPage">
      <div id="videoContainer">
        {signaling && (
          <WebRTC
            signaling={signaling}
            onSendMessage={handleSendMessage}
            rtcRoomNum={params.params}
          />
        )}
      </div>
    </div>
  );
};

export default VideoPage;
