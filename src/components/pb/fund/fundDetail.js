import { useEffect, useState } from "react";
import axios from "axios";

function FundDetail({ selectedFund }) {
  const [selectedFundDetail, setSelectedFundDetail] = useState([]);

  useEffect(() => {
    if (!selectedFund) {
      return;
    }
    const fetchData = async () => {
      try {
        axios
          .get("http://localhost:8080/api/fund/securities/get", {
            params: {
              id: selectedFund.id,
            },
          })
          .then((res) => {
            console.log(res.data);
            setSelectedFundDetail(res.data);
            
          });
      } catch (error) {
        console.log(error);
      }
      
    };
    fetchData();
  }, [selectedFund]);

  if (!selectedFund) {
    return <div className="fund-detail">펀드를 선택하세요</div>;
  }

  return (
    <div className="fund-detail">
      <h2>{selectedFund.name}</h2>
      <div className="fund-chart">
        {/* 차트 컴포넌트를 여기에 포함할 수 있습니다 */}
      </div>
      <table className="fund-table">
        <thead>
          <tr>
            <th>자산구분</th>
            <th>비중(%)</th>
          </tr>
        </thead>
        <tbody>
          {/* 샘플 데이터, 실제 데이터로 교체 필요 */}
          {selectedFundDetail &&
            selectedFundDetail.map((data, index) => (
              <tr key={index}>
                <td>{data.security.name}</td>
                <td>{data.fundSecurityPercentage}</td>
              </tr>
            ))}
          {/* 추가 데이터 행들 */}
        </tbody>
      </table>
    </div>
  );
}

export default FundDetail;
