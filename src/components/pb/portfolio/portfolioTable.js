import { useEffect, useState } from "react";
import axios from "axios";

function PortfolioTable() {
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get("http://localhost:8080/api/portfolio/extract/view", {
            params: {
              vipId: 1,
            },
          })
          .then((res) => {
            console.log(res.data.portfolioItemResponseDtos);
            setPortfolioItems(res.data.portfolioItemResponseDtos);
            // 2중 axios 가능?
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="portfolio-items-list">
      <table className="table port">
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
              <td>{item.startAmount.toLocaleString("ko-KR")}</td>
              <td>{item.evalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PortfolioTable;
