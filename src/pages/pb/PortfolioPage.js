// 손님 포트폴리오 관리 페이지

import SideBar from "../../components/pb/Sidebar";
import PortfolioTable from "../../components/pb/portfolio/portfolioTable";

function PortfolioPage() {
  return (
    <div className="fund-page">
      <SideBar />
      <main className="main" id="main" style={{ width: "100%" }}>
        <div className="main-content">
          <PortfolioTable />
          {/* <AmountInput /> */}
        </div>
      </main>
    </div>
  );
}

export default PortfolioPage;
