import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FundCheckItem from '../../components/common/FundCheckItem';
import Pdf from '../../components/common/Pdf';
const fundId = 1;

const ConsentPage = ({ suggestionItemData }) => {
  const [data, setData] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getData();
    console.log(suggestionItemData);
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
    <div className="consent-page">
      <h1 className="card-title">{'희망 미래 펀드'}</h1>
      <h3 className="card-body">
        {
          '이 펀드는 어쩌구 저쩌구 펀드입니다. 이건 이렇구요 저건 저렇구요 이래되고요 저래되고 이런사람들한테 추천하는 펀드입니다요'
        }
      </h3>
      <h5 className="fund-header-left">{'필수 서류 확인'}</h5>
      <div className="fund-check-list">
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
      </div>

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
              <div className="agree-container">
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
