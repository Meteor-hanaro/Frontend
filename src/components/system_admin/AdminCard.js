import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminCardSub from './AdminCardSub';
import FundList from '../pb/fund/fundList';
import FundDetail from '../pb/fund/fundDetail';

function AdminCard({ infoNumber }) {
  const [vipData, setVipData] = useState([]);
  const [pbData, setPbData] = useState([]);

  const [selectedFund, setSelectedFund] = useState(null);

  useEffect(() => {
    // vip info
    axios
      .get(`http://${process.env.REACT_APP_BESERVERURI}/api/vip/admin/findAll`)
      .then((res) => {
        setVipData(res.data);
      })
      .catch((e) => console.log(e));
    // pb info
    axios
      .get(`http://${process.env.REACT_APP_BESERVERURI}/api/pb/admin/findAll`)
      .then((res) => {
        setPbData(res.data);
      })
      .catch((e) => console.log(e));
    // portfolio info
  }, [infoNumber]);

  return (
    <>
      {/* data 뿌려주기 jumbotron */}
      {infoNumber === 0 && <AdminCardSub data={vipData} type={'vip'} />}
      {infoNumber === 1 && <AdminCardSub data={pbData} type={'pb'} />}
      {infoNumber === 2 && (
        <div className="main-content">
          <FundList onSelectFund={setSelectedFund} />
          <FundDetail selectedFund={selectedFund} />
          {/* <AmountInput /> */}
        </div>
      )}
    </>
  );
}

export default AdminCard;
