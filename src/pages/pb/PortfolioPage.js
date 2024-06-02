// 손님 포트폴리오 관리 페이지
import { useState } from 'react';

import SideBar from '../../components/pb/Sidebar';
import PortfolioTable from '../../components/pb/portfolio/portfolioTable';
import PortfolioGraph from '../../components/pb/portfolio/portfolioGraph';

function PortfolioPage() {
  const [showGraph, setShowGraph] = useState(false);

  const toggleView = () => {
    setShowGraph(!showGraph);
  };

  return (
    <div className='fund-page'>
      <SideBar />
      <main className='main' id='main' style={{ width: '100%' }}>
        <button
          onClick={toggleView}
          className='toggle-button graph-table-button btn btn-success'
        >
          {showGraph ? 'Show Table' : 'Show Graph'}
        </button>
        <div className='main-content'>
          {showGraph ? <PortfolioGraph /> : <PortfolioTable />}
          {/* <AmountInput /> */}
        </div>
        <button className='graph-table-button btn btn-success'>
          포트폴리오 추가
        </button>
      </main>
    </div>
  );
}

export default PortfolioPage;
