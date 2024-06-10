import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import FundCheckItem from '../../components/common/FundCheckItem';
import Pdf from '../../components/common/Pdf';
import FundContract from '../../components/common/FundContract';

const ConsentPage = ({ suggestionItemData, rtcRoomNum }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.post(
        `http://${process.env.REACT_APP_BESERVERURI}/api/contract/join`,
        {
          fundIds: suggestionItemData,
        }
      );
      setData(addCheckInContract(data));
    } catch {}
  };

  useEffect(() => {
    if (!data.length) return;

    ws.current = new WebSocket(
      `ws://${process.env.REACT_APP_SUGGESTIONLISTWS}/${rtcRoomNum}`
    );

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.current.onmessage = async (event) => {
      try {
        if (event.data instanceof Blob) {
          const text = await event.data.text();
          handleWebSocketMessage(JSON.parse(text));
        } else {
          console.error('Unsupported message format:', event.data);
          return;
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    return () => {
      ws.current.close();
    };
  }, [data, rtcRoomNum]); // data가 로드된 후에 WebSocket을 설정

  const handleWebSocketMessage = (message) => {
    switch (message.type) {
      case 'itemClick':
        setSelectedItem(message.item);
        setModalVisible(true);
        break;
      case 'modalClose':
        setModalVisible(false);
        break;
      case 'itemAgree':
        handleAgree(message.item);
        break;
      default:
        break;
    }
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
    ws.current.send(JSON.stringify({ type: 'itemClick', item }));
  };

  const handleModalClose = () => {
    setModalVisible(false);
    ws.current.send(JSON.stringify({ type: 'modalClose' }));
  };

  const handleAgreeClick = (item) => {
    handleAgree(item);
    sendItemAgreeSocket(item);
  };

  const handleAgree = (item) => {
    if (!data) return;

    const updatedData = data.map((fund) => {
      const updatedContracts = fund.fundContracts.map((contract) => {
        if (contract.id === item.id) {
          return { ...contract, isChecked: !contract.isChecked };
        }
        return contract;
      });
      return { ...fund, fundContracts: updatedContracts };
    });

    setData(updatedData);

    const updatedSelectedItem = {
      ...item,
      isChecked: !item.isChecked,
    };
    setSelectedItem(updatedSelectedItem);
  };

  const sendItemAgreeSocket = (item) => {
    if (ws.current) {
      ws.current.send(JSON.stringify({ type: 'itemAgree', item }));
    }
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
              <span className="close" onClick={handleModalClose}>
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
                    onChange={() => handleAgreeClick(selectedItem)}
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
