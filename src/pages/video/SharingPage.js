import IdVerificationPage from '../consult/IdVerificationPage';
import { useEffect, useState, useRef } from 'react';
import RebalancingPage from '../consult/RebalancingPage';
import Sign from '../consult/Sign';
import AuthPage from '../consult/AuthPage';
import ConsentPage from '../consult/ConsentPage';

const SharingPage = ({ number, localVideoRef, rtcRoomNum }) => {
  // RebalancingPage -> ConsentPage
  const [suggestionItemList, setSuggestionItemList] = useState([]);
  const [suggestionItemNumber, setSuggestionItemNumber] = useState([]);
  const [suggestionId, setSuggestionId] = useState();
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(
      `${process.env.REACT_APP_SUGGESTIONLISTWS}/${rtcRoomNum}`
    );

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
      ws.current.send(JSON.stringify({ type: 'getSuggestionList' }));
    };

    ws.current.onmessage = async (event) => {
      try {
        if (event.data instanceof Blob) {
          const text = await event.data.text();
          setSuggestionItemList(JSON.parse(text).suggestionItemList);
        } else {
          console.error('Unsupported message format:', event.data);
          return;
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
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
        <RebalancingPage
          setSuggestionItemList={setSuggestionItemList}
          setSuggestionItemNumber={setSuggestionItemNumber}
          setSuggestionId={setSuggestionId}
        />
      )}
      {number === 2 && (
        <IdVerificationPage
          localVideoRef={localVideoRef}
          rtcRoomNum={rtcRoomNum}
        />
      )}
      {number === 3 && <ConsentPage suggestionItemData={suggestionItemList} />}
      {number === 4 && <AuthPage rtcRoomNum={rtcRoomNum} />}
      {number === 5 && (
        <Sign
          suggestionItemData={suggestionItemList}
          suggestionItemNumber={suggestionItemNumber}
          suggestionId={suggestionId}
          rtcRoomNum={rtcRoomNum}
        />
      )}
    </div>
  );
};

export default SharingPage;
