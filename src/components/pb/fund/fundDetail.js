import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

function FundDetail({ selectedFund }) {
  const [selectedFundDetail, setSelectedFundDetail] = useState([]);
  const [chartData, setChartData] = useState(null);
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
            const labels = [];
            const data = [];
            const backgroundColor = [];
            const borderColor = [];

            res.data.forEach((item) => {
              // labels에는 security.name을 추가
              labels.push(item.security.name);
              // datasets의 data에는 fundSecurityPercentage를 추가
              data.push(item.fundSecurityPercentage);
              // 무작위 색상 생성
              const randomColor = `rgba(${Math.floor(
                Math.random() * 256
              )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
              )}, 0.5)`;
              backgroundColor.push(randomColor);
              borderColor.push(randomColor.replace("0.5", "1")); // 투명도 조절
            });

            // 데이터 객체 구성
            setChartData({
              labels: labels,
              datasets: [
                {
                  label: "My First Dataset",
                  data: data,
                  backgroundColor: backgroundColor,
                  borderColor: borderColor,
                  borderWidth: 1,
                  hoverOffset: 4,
                },
              ],
            });
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

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.labels[context.dataIndex] || "";
            const value = context.formattedValue;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  // 차트 컴포넌트에서 options를 설정하여 Pie Chart의 툴팁을 활성화

  // 차트 컴포넌트에서 options를 설정하여 Pie Chart의 크기를 조절

  return (
    <div className="fund-detail">
      <h2>{selectedFund.name}</h2>
      <h3>포트폴리오 현황</h3>
      <div className="fund-chart">
        {chartData && (
          <Pie data={chartData} id="fundPieChart" options={options} />
        )}
        {/* 차트 컴포넌트를 여기에 포함할 수 있습니다 */}
        <table>
          <thead>
            <tr>
              <th>자산구분</th>
              <th>금액</th>
              <th>비중(%)</th>
            </tr>
          </thead>
        </table>
      </div>
      <h3>펀드 상세정보</h3>
      <table className="fund-table">
        <thead>
          <tr>
            <th>순위</th>
            <th>자산구분</th>
            <th>비중(%)</th>
          </tr>
        </thead>
        <tbody>
          {/* 샘플 데이터, 실제 데이터로 교체 필요 */}
          {selectedFundDetail &&
            selectedFundDetail.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
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
