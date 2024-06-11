import IdVerificationPage from "../consult/IdVerificationPage";
import { useEffect, useState, useRef } from "react"; 
import RebalancingPage from "../consult/RebalancingPage";
import Sign from "../consult/Sign";
import AuthPage from "../consult/AuthPage";
import ConsentPage from "../consult/ConsentPage";

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
          const parsedData = JSON.parse(text);
          setSuggestionItemList(parsedData.suggestionItemList || []);
          setSuggestionItemNumber(parsedData.suggestionItemNumber || []);
          setSuggestionId(parsedData.suggestionId || null);
        } else {
          console.error('Unsupported message format:', event.data);
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
  }, [rtcRoomNum]); // rtcRoomNum이 변경될 때마다 useEffect 재실행

  const updateSuggestionList = (item, number, id) => {
    setSuggestionItemList(item);
    setSuggestionItemNumber(number);
    setSuggestionId(id);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: 'updateSuggestionList',
          suggestionItemList: item,
          suggestionItemNumber: number,
          suggestionId: id,
        })
      );
    }
  };

  return (
    <div id="divSharing">
      {number === 1 && (
        <RebalancingPage
          setSuggestionItemList={updateSuggestionList}
          setSuggestionItemNumber={setSuggestionItemNumber}
          // setSuggestionId={setSuggestionId}
          rtcRoomNum={rtcRoomNum}
        />
      )}
      {number === 2 && <IdVerificationPage localVideoRef={localVideoRef} rtcRoomNum={rtcRoomNum} />}
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
