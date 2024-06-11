// 손님 포트폴리오 관리 페이지
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import SideBar from '../../components/pb/Sidebar';
import PortfolioTable from '../../components/pb/portfolio/portfolioTable';
import PortfolioGraph from '../../components/pb/portfolio/portfolioGraph';
import Header from '../../components/common/Header';

function PortfolioPage() {
  const [showGraph, setShowGraph] = useState(false);

  const location = useLocation();
  const { vipId } = location.state || {}; // state가 없을 경우를 대비하여 기본값을 빈 객체로 설정

  const toggleView = () => {
    setShowGraph(!showGraph);
  };

  return (
    <div className="fund-page">
      <Header />
      <SideBar />
      <main className="main" id="main" style={{ width: '100%' }}>
        <button
          onClick={toggleView}
          className="toggle-button graph-table-button btn btn-success"
        >
          {showGraph ? 'Show Table' : 'Show Graph'}
        </button>
        <div className="main-content">
          {showGraph ? (
            <PortfolioGraph vipId={vipId} />
          ) : (
            <PortfolioTable vipId={vipId} />
          )}
          {/* <AmountInput /> */}
        </div>
      </main>
    </div>
  );
}

export default PortfolioPage;
