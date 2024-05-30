import { useEffect, useState } from "react";
import axios from "axios";

function PortfolioTable() {
  const [portfolio, setPortfolio] = useState(null);

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
            console.log(res.data);
            setPortfolio(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return <div className="fund-list">HI</div>;
}

export default PortfolioTable;
