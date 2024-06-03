// 손님 포트폴리오 관리 페이지
import { useState } from 'react';

import SideBar from '../../components/pb/Sidebar';
import PortfolioTable from '../../components/pb/portfolio/portfolioTable';
import PortfolioGraph from '../../components/pb/portfolio/portfolioGraph';
import Header from '../../components/common/Header';

import { LoginContext } from '../../contexts/LoginContextProvider';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PortfolioPage() {
  const [showGraph, setShowGraph] = useState(false);
  const { isLogin } = useContext(LoginContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate('/pb');
    }
  }, []);

  const toggleView = () => {
    setShowGraph(!showGraph);
  };

  return (
    <div className='fund-page'>
      <Header />
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
