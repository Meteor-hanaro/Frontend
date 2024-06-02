import { useState } from 'react';

import FundList from '../../components/pb/fund/fundList';
import FundDetail from '../../components/pb/fund/fundDetail';
import SideBar from '../../components/pb/Sidebar';

function FundPage() {
  const [selectedFund, setSelectedFund] = useState(null);

  return (
    <div className="fund-page">
      <SideBar />
      <main className="main" id="main" style={{ width: '100%' }}>
        <div className="main-content">
          <FundList onSelectFund={setSelectedFund} />
          <FundDetail selectedFund={selectedFund} />
          {/* <AmountInput /> */}
        </div>
      </main>
    </div>
  );
}

export default FundPage;
