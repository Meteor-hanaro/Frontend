import IdVerificationPage from '../consult/IdVerificationPage';
import { useEffect, useState, useRef } from 'react';
import RebalancingPage from '../consult/RebalancingPage';
import Sign from '../consult/Sign';
import AuthPage from '../consult/AuthPage';
import ConsentPage from '../consult/ConsentPage';
const SharingPage = ({ number, localVideoRef, rtcRoomNum }) => {
  // RebalancingPage -> ConsentPage
  const [suggestionItemList, setSuggestionItemList] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://${process.env.REACT_APP_SUGGESTIONLISTWS}/${rtcRoomNum}`
    );

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
      ws.current.send(JSON.stringify({ type: 'getSuggestionList' }));
    };

    ws.current.onmessage = (event) => {
      const receivedData = event.data;
      receivedData.text().then((text) => {
        if (JSON.parse(text).type === 'updateSuggestionList') {
          setSuggestionItemList(JSON.parse(text).suggestionItemList);
        }
      });
    };

    return () => {
      ws.current.close();
    };
  }, [rtcRoomNum]);

  useEffect(() => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({ type: 'updateSuggestionList', suggestionItemList })
      );
    }
  }, [suggestionItemList]);

  return (
    <div id="divSharing">
      {number === 1 && (
        <RebalancingPage setSuggestionItemList={setSuggestionItemList} />
      )}
      {number === 2 && <IdVerificationPage localVideoRef={localVideoRef} />}
      {number === 3 && <ConsentPage suggestionItemData={suggestionItemList} />}
      {number === 4 && <AuthPage />}
      {number === 5 && <Sign />}
    </div>
  );
};

export default SharingPage;
