import { useEffect, useState } from 'react';
import axios from '../../../config/AxiosConfig';
import auth from '../../../auth';

function PortfolioTable(vipId) {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [vipName, setVipName] = useState('');
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get(`/api/portfolio/itemValue`, {
            params: {
              vipId: vipId.vipId,
            },
          })
          .then((res) => {
            setLoading(false); // 데이터를 모두 받아오면 로딩 상태 변경
            setPortfolioItems(res.data);
          });
      } catch (error) {
        setLoading(false); // 데이터 로드 완료 후 로딩 상태 해제
        console.log(error);
      }

      try {
        auth
          .get(`/api/vip/name`, {
            params: {
              vipId: vipId.vipId,
            },
          })
          .then((res) => {
            setVipName(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div id="main">Loading...</div>; // 로딩 중일 때 표시
  }

  return (
    <div className="portfolio-status">
      <h2>{vipName}님의 포트폴리오</h2>
      <table className="table port fund-table">
        <thead>
          <tr>
            <th>펀드명</th>
            <th>신규일</th>
            <th>투자원금</th>
            <th>평가금액</th>
          </tr>
        </thead>
        <tbody>
          {portfolioItems.map((item, index) => (
            <tr key={index}>
              <td>{item.fundName}</td>
              <td>
                {item.startDate[0]}.{item.startDate[1]}.{item.startDate[2]}
              </td>
              <td>{item.startAmount.toLocaleString('ko-KR')}</td>
              <td>{item.evaluationAmount.toLocaleString('ko-KR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PortfolioTable;
