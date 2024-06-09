import React, { useEffect, useState } from 'react';
import WebRTC from '../WebRTC';

function VideoPage() {
  const [signaling, setSignaling] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://${process.env.REACT_APP_WEBRTCWS}`);
    ws.onopen = () => {
      console.log('Connected to signaling server');
    };
    setSignaling(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="VideoPage">
      <header>
        <h1>WebRTC Example</h1>
      </header>
      {signaling && <WebRTC signaling={signaling} />}
    </div>
  );
}

export default VideoPage;
