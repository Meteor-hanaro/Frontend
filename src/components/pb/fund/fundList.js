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
        console.log(error);
      }
    };
    fetchData();
  }, []);

    return (
        <>
        <div className="col-12" style={{ marginTop: "25px" }}>
            <div className="card recent-sales overflow-auto">
            <div className="card-body" style={{ padding: "20px" }}>
                <table className="table table-borderless datatable">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {fund.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </>
    );  
}

export default FundList;

// useEffect(() => {
//     axios.get("http://localhost:8080/api").then((res) => {
//       setData(res.data);
//       console.log(data);
//     });
//   });
