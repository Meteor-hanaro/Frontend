import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';

Chart.register(ArcElement);

function FundDetailForAddition({ selectedFund, suggestionId }) {
  const [selectedFundDetail, setSelectedFundDetail] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [stockPercentage, setStockPercentage] = useState(0);
  const [bondPercentage, setBondPercentage] = useState(0);

  const navigate = useNavigate();

  const handleAddFund = () => {
    axios.post(
      `http://${process.env.REACT_APP_BESERVERURI}/api/suggestion/fund/add`,
      {
        suggestionId: suggestionId,
        fundId: selectedFund.id,
        fundValue: document.querySelector('.fund-value-input').value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    navigate('/pb/main');
  };

  useEffect(() => {
    if (!selectedFund) {
      return;
    }
    const fetchData = async () => {
      try {
        axios
          .get(
            `http://${process.env.REACT_APP_BESERVERURI}/api/fund/securities/get`,
            {
              params: {
                id: selectedFund.id,
              },
            }
          )
          .then((res) => {
            let stockPercentage = 0;
            let bondPercentage = 0;
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
              if (item.security.id.includes('KR')) {
                bondPercentage += item.fundSecurityPercentage;
              } else {
                stockPercentage += item.fundSecurityPercentage;
              }
              data.push(item.fundSecurityPercentage);
              // 무작위 색상 생성
              const randomColor = `rgba(${Math.floor(
                Math.random() * 256
              )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
              )}, 0.5)`;
              backgroundColor.push(randomColor);
              borderColor.push(randomColor.replace('0.5', '1')); // 투명도 조절
            });
            setStockPercentage(stockPercentage);
            setBondPercentage(bondPercentage);
            // 데이터 객체 구성
            setChartData({
              labels: ['채권', '주식'],
              datasets: [
                {
                  label: 'My First Dataset',
                  data: [bondPercentage, stockPercentage],
                  backgroundColor: [
                    'rgb(255, 192, 103, 1)',
                    'rgb(80, 188, 223, 1)',
                  ],
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
    return <div className='fund-detail'>펀드를 선택하세요</div>;
  }

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            console.log('CONTEXT:', context);
            const l = context?.dataset?.labels?.[context.dataIndex] || '';
            const value = context.formattedValue;
            return `${l}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <div className='fund-detail'>
      <h2>{selectedFund.name}</h2>
      <h3>포트폴리오 현황</h3>
      <div className='portfolio-status alignHorizontal'>
        <div className='fund-chart'>
          {chartData && (
            <Pie data={chartData} id='fundPieChart' options={options} />
          )}
          {/* 차트 컴포넌트를 여기에 포함할 수 있습니다 */}
        </div>
        <table className='table stock-bond-table'>
          <thead>
            <tr>
              <th>자산구분</th>
              <th>비중(%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>주식</td>
              <td>{stockPercentage}</td>
            </tr>
            <tr>
              <td>채권</td>
              <td>{bondPercentage}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>펀드 상세정보</h3>
      <table className='fund-table'>
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
      <div className='new-value-input'>
        <input type='number' placeholder='투입 금액 입력' className='fund-value-input'></input>
        <button className='add-fund-btn' onClick={handleAddFund}>
          ADD
        </button>
      </div>
    </div>
  );
}

export default FundDetailForAddition;
