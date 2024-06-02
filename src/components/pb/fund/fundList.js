import { useEffect, useState } from 'react';
import axios from 'axios';

function FundList({ onSelectFund }) {
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get('http://localhost:8080/api/fund/get').then((res) => {
          setFunds(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="fund-list">
      {funds.map((fund, index) => (
        <div
          key={index}
          className="fund-item"
          onClick={() => onSelectFund(fund)}
        >
          {fund.name}
        </div>
      ))}
    </div>
  );
}

export default FundList;
