import { useEffect, useState } from "react";
import axios from "axios";

function FundList() {
  const [fund, setFund] = useState([]);
  const [selectedFund, setSelectedFund] = useState(null);
  const [fundDetails, setFundDetails] = useState(null);

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

  const handleItemClick = (item) => {
    setSelectedFund(item);
    fetchFundDetails(item.id); // assuming item has an id
  };

  const fetchFundDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/fund/securities/get`, {
        params: {
          id: id,
        },
      });
      setFundDetails(response.data);
      alert(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

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
                    <td
                      onClick={() => handleItemClick(item)}
                      className="btn btn-link"
                    >
                      {item.name}
                    </td>
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
