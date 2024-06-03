import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FundCheckItem from '../../components/common/FundCheckItem';
import Pdf from '../../components/common/Pdf';
import FundContract from '../../components/common/FundContract';

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
        `https://195542be-07de-4400-96fd-095a9a72e125.mock.pstmn.io/api/contract/join`
      );
      setData(addCheckInContract(data));
    } catch {}
  };

  // 각 계약동의서에 프로퍼티 추가
  const addCheckInContract = (data) => {
    return data.map((item) => ({
      ...item,
      fundContracts: addCheckProperty(item.fundContracts),
    }));
  };

  // 체크여부 프로퍼티 추가하기
  const addCheckProperty = (data) => {
    return data.map((item) => ({ ...item, isChecked: false }));
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleAgree = () => {
    const updatedData = data.map((fund) => {
      const updatedContracts = fund.fundContracts.map((contract) => {
        if (contract.id === selectedItem.id) {
          return { ...contract, isChecked: !contract.isChecked };
        }
        return contract;
      });
      return { ...fund, fundContracts: updatedContracts };
    });

    setData(updatedData);

    const updatedSelectedItem = {
      ...selectedItem,
      isChecked: !selectedItem.isChecked,
    };
    setSelectedItem(updatedSelectedItem);
  };

  return (
    <div className="consent-page">
      {data &&
        data.map((item) => {
          return (
            <FundContract items={item} handleItemClick={handleItemClick} />
          );
        })}

      {modalVisible && selectedItem && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <span className="close" onClick={() => setModalVisible(false)}>
                &times;
              </span>
              <p className="card-title">{selectedItem.title}</p>
              <p className="fund-card-body">{selectedItem.description}</p>
              <div className="pdf-container">
                <Pdf pdfFile={selectedItem.pdfUrl} />
              </div>
              <div className="fund-check-item">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItem.isChecked}
                    onChange={handleAgree}
                  />
                  <span className="checkmark"></span>
                </label>
                위 내용을 확인하였으며, 동의합니다.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsentPage;
