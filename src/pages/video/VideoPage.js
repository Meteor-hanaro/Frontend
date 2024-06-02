import React, { useEffect, useState, useRef } from 'react';
import WebRTC from './WebRTC';

const VideoPage = () => {
  const [signaling, setSignaling] = useState(null);
  const sendMessageRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8888');
    ws.onopen = () => {
      console.log('Connected to signaling server');
    };
    setSignaling(ws);

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
