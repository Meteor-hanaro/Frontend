import { useEffect, useState } from "react";
import axios from "axios";

function PortfolioTable() {
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get("http://localhost:8080/api/portfolio/extract", {
            params: {
              vipId: 1,
            },
          })
          .then((res) => {
            setPortfolioItems(res.data.portfolioItems);
            console.log(res.data.portfolioItems);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="portfolio-items-list">
      {portfolioItems.map((item, index) => (
        <div key={index} className="portfolio-item">
          {item.fundId}
        </div>
      ))}
    </div>
  );
}

export default PortfolioTable;
