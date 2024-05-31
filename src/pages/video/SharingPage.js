import IdVerificationPage from './IdVerificationPage';
import { useEffect } from 'react';
import RebalancingPage from './RebalancingPage';
import Sign from '../Sign';
import AuthPage from '../AuthPage';
import ConsentPage from './ConsentPage';

const SharingPage = ({ number, localVideoRef }) => {
  //   useEffect(() => {}, [number]);

  return (
    <div id="divSharing">
      {/* SharingPage 화면의 주석을 해제하세요 ~_~ <br /><br /> */}
      {number === 1 && <RebalancingPage />}
      {number === 2 && <IdVerificationPage localVideoRef={localVideoRef} />}
      {number === 3 && <ConsentPage />}
      {number === 4 && <AuthPage />}
      {number === 5 && <Sign />}
    </div>
  );
};

export default SharingPage;
