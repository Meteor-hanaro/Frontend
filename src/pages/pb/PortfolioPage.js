// 손님 포트폴리오 관리 페이지

import { useState } from "react";

import SideBar from "../../components/pb/Sidebar";

function PortfolioPage() {
  return (
    <div className="fund-page">
      <SideBar />
      <main className="main" id="main" style={{ width: "100%" }}>
        <div className="main-content">
          <PortfolioDetail />
          {/* <AmountInput /> */}
        </div>
      </main>
    </div>
  );
}

export default PortfolioPage;
