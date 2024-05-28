function FundDetail({selectedFund}) {
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
            <th>금액(백만)</th>
            <th>비중(%)</th>
          </tr>
        </thead>
        <tbody>
          {/* 샘플 데이터, 실제 데이터로 교체 필요 */}
          <tr>
            <td>주식</td>
            <td>11,200</td>
            <td>30.43</td>
          </tr>
          {/* 추가 데이터 행들 */}
        </tbody>
      </table>
    </div>
  );
}

export default FundDetail;
