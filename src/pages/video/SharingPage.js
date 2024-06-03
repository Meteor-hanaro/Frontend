import IdVerificationPage from "../consult/IdVerificationPage";
import { useEffect, useState } from "react"; 
import RebalancingPage from "../consult/RebalancingPage";
import Sign from "../consult/Sign";
import AuthPage from "../consult/AuthPage";
import ConsentPage from "./ConsentPage";
const SharingPage = ({ number, localVideoRef }) => {
  // RebalancingPage -> ConsentPage
  const [suggestionItemList, setSuggestionItemList] = useState([]);

  useEffect(() => {}, [suggestionItemList]);

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
