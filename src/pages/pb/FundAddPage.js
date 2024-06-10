import { useState } from 'react';
import Header from '../../components/common/Header';
import FundList from '../../components/pb/fund/fundList';
import SideBar from '../../components/pb/Sidebar';
import FundDetailForAddition from '../../components/pb/fund/fundDetailForAddition';
import { useLocation } from 'react-router-dom';

function FundAddPage() {
  const location = useLocation();
  const [selectedFund, setSelectedFund] = useState(null);
  const { suggestionId } = location.state || {}; // 전달된 상태에서 suggestionId 추출

  console.log('SUGGESTION ID IN FUND ADD PAGE: ', suggestionId);
  return (
    <div className='fund-page'>
      <Header />
      <SideBar />
      <main className='main' id='main' style={{ width: '100%' }}>
        <div className='main-content'>
          <FundList onSelectFund={setSelectedFund} />
          <FundDetailForAddition
            selectedFund={selectedFund}
            suggestionId={suggestionId}
          />
          {/* <AmountInput /> */}
        </div>
      </main>
    </div>
  );
}

export default FundAddPage;
