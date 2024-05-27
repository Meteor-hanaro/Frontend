import { useEffect, useState } from "react";
import axios from "axios";

function FundList() {
  const [fund, setFund] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get("http://localhost:8080/api/fund/get").then((res) => {
            setFund(res.data);
            console.log(res.data);
        });
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);
}

export default FundList;

// useEffect(() => {
//     axios.get("http://localhost:8080/api").then((res) => {
//       setData(res.data);
//       console.log(data);
//     });
//   });