import { useEffect, useRef } from 'react';

function OcrCapture({ setSuggestionNumber, data }) {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://${process.env.REACT_APP_SUGGESTIONLISTWS}`
    );

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
      ws.current.send(JSON.stringify({ type: 'getCurrentStep' }));
    };

    // 페이지 번호 데이터 수신
    ws.current.onmessage = (event) => {
      const receivedData = event.data;
      receivedData.text().then((text) => {
        if (JSON.parse(text).type === 'updateSuggestion') {
          setSuggestionNumber(JSON.parse(text).step);
        }
      });
    };
    return () => {
      ws.current.close();
    };
  }, []);

  const updateProgress = (step) => {
    console.log('click');
    setSuggestionNumber(step);
    // 페이지 번호 변경할 때마다 데이터 전송
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'updateSuggestion', step }));
    }
  };

  return (
    <>
      
    
    </>
  );
}

export default OcrCapture;
