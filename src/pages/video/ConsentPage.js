import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FundCheckItem from '../../components/common/FundCheckItem';
import Pdf from '../../components/common/Pdf';
const fundId = 1;

const ConsentPage = () => {
  const [data, setData] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/contract/join/${fundId}`
      );
      setData(addCheckProperty(data));
    } catch {}
  };

  // 체크여부 프로퍼티 추가하기
  const addCheckProperty = (data) => {
    return data.map((item) => ({ ...item, isChecked: false }));
  };

  const handleItemClick = (item) => {
    console.log('fdsf');
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleAgree = () => {
    const updatedData = [...data];
    const index = updatedData.findIndex(
      (item) => item.title === selectedItem.title
    );
    if (index !== -1) {
      updatedData[index].isChecked = !updatedData[index].isChecked;
      setData(updatedData);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: 'white', // 배경을 흰색으로 설정
      }}
    >
      {data &&
        data.map((item, index) => {
          return (
            <FundCheckItem
              key={index}
              isCheck={item.isChecked}
              title={item.title}
              onClick={() => handleItemClick(item)}
            />
          );
        })}

      {modalVisible && selectedItem && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <span className="close" onClick={() => setModalVisible(false)}>
                &times;
              </span>
              <h2>{selectedItem.title}</h2>
              <p>{selectedItem.description}</p>
              <div className="pdf-container">
                <Pdf pdfFile={selectedItem.pdfUrl} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={selectedItem.isChecked}
                  onChange={handleAgree}
                />
                <label htmlFor="agree">동의합니다</label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsentPage;
