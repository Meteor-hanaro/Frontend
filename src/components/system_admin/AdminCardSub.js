import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminCardSub({ data, type }) {
  const [infoData, setInfoData] = useState([]);
  const [infoDetailData, setInfoDetailData] = useState([]);

  useEffect(() => {
    setInfoData(data);
    console.log(infoData);
  }, [data, infoDetailData]);

  const selectVip = (item) => {
    console.log(item);
    setInfoDetailData(item);
  };

  return (
    <>
      {type === 'vip' && (
        <>
          <div className="col-md-6" style={{ backgroundColor: '#ecf0f1' }}>
            <div className="p-5 rounded-3" style={{ maxHeight: '100vh' }}>
              <h2>VIP List</h2>
              {/* data 뿌려주기 jumbotron */}
              <div className="overflow-auto" style={{ maxHeight: '70vh' }}>
                {infoData &&
                  infoData.map((item, index) => (
                    <div
                      className="p-5 bg-body rounded-3 my-2"
                      onClick={() => selectVip(item)}
                    >
                      <h3 className="text-body-emphasis">{item.user.name}</h3>
                      <h5 className="text-body-emphasis">{item.user.email}</h5>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-md-6" style={{ backgroundColor: '#ecf0f1' }}>
            <div className="p-5 rounded-3" style={{ maxHeight: '100vh' }}>
              {/* data 뿌려주기 jumbotron */}
              <h2>VIP Detail Information</h2>
              <div className="p-5 bg-body rounded-3 my-2">
                <h3 className="text-body-emphasis">
                  {infoDetailData.user && infoDetailData.user.name}
                </h3>
                <h5 className="text-body-emphasis">
                  {infoDetailData.user && infoDetailData.user.email}
                </h5>
              </div>
            </div>
          </div>
        </>
      )}
      {type === 'pb' && (
        <>
          <div className="col-md-6" style={{ backgroundColor: '#ecf0f1' }}>
            <div className="p-5 rounded-3" style={{ maxHeight: '100vh' }}>
              <h2>PB List</h2>
              {/* data 뿌려주기 jumbotron */}
              <div className="overflow-auto" style={{ maxHeight: '70vh' }}>
                {infoData &&
                  infoData.map((item, index) => (
                    <div className="p-5 bg-body rounded-3 my-2">
                      <h3 className="text-body-emphasis">{item.user.name}</h3>
                      <h5 className="text-body-emphasis">{item.user.email}</h5>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-md-6" style={{ backgroundColor: '#ecf0f1' }}>
            <div className="p-5 rounded-3" style={{ maxHeight: '100vh' }}>
              {/* data 뿌려주기 jumbotron */}
              <h2>PB Detail Information</h2>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminCardSub;
