import { useEffect, useState } from 'react';
import axios from 'axios';

function PortfolioTable() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [vipName, setVipName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get('http://localhost:8080/api/portfolio/itemValue', {
            params: {
              vipId: 1,
            },
          })
          .then((res) => {
            setPortfolioItems(res.data);
            console.log(res.data);
            // 2중 axios 가능?
          });
      } catch (error) {
        console.log(error);
      }

      try {
        axios
          .get('http://localhost:8080/api/user/name', {
            params: {
              vipId: 1,
            },
          })
          .then((res) => {
            console.log(res.data);
            setVipName(res.data);
            // 2중 axios 가능?
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='portfolio-status'>
      <h2>{vipName}님의 포트폴리오</h2>
      <table className='table port fund-table'>
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
