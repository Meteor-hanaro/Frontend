import IdVerificationPage from '../consult/IdVerificationPage';
import { useEffect, useState } from 'react';
import RebalancingPage from '../consult/RebalancingPage';
import Sign from '../consult/Sign';
import AuthPage from '../consult/AuthPage';
import ConsentPage from '../consult/ConsentPage';

const SharingPage = ({ number, localVideoRef, rtcRoomNum }) => {
  // RebalancingPage -> ConsentPage
  const [suggestionItemList, setSuggestionItemList] = useState([]);
  const [suggestionItemNumber, setSuggestionItemNumber] = useState([]);
  const [suggestionId, setSuggestionId] = useState();

  useEffect(() => {}, [suggestionItemList]);

  return (
    <div id="divSharing">
      {number === 1 && (
        <RebalancingPage setSuggestionItemList={setSuggestionItemList} setSuggestionItemNumber={setSuggestionItemNumber} setSuggestionId={setSuggestionId}/>
      )}
      {number === 2 && (
        <IdVerificationPage
          localVideoRef={localVideoRef}
          rtcRoomNum={rtcRoomNum}
        />
      )}
      {number === 3 && <ConsentPage suggestionItemData={suggestionItemList} />}
      {number === 4 && <AuthPage rtcRoomNum={rtcRoomNum} />}
      {number === 5 && <Sign suggestionItemData={suggestionItemList} suggestionItemNumber={suggestionItemNumber} suggestionId={suggestionId} rtcRoomNum={rtcRoomNum}/>}
    </div>
  );
};

export default SharingPage;
