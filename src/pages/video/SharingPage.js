import ContractPage from "./ContractPage";
import IdVerificationPage from "./IdVerificationPage";
import { useEffect } from "react";
import RebalancingPage from "./RebalancingPage";

const SharingPage = ({ number }) => {
  //   useEffect(() => {}, [number]);

  return (
    <div id="divSharing">
      {/* SharingPage 화면의 주석을 해제하세요 ~_~ <br /><br /> */}
      {number === 1 && <RebalancingPage />}
      {number === 2 && <IdVerificationPage />}
      {number === 3 && <ContractPage />}
    </div>
  );
};

export default SharingPage;
