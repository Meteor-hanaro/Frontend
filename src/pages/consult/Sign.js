import React, { useRef, useEffect, useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { useLocation } from 'react-router-dom';
import Pdf from '../../components/common/Pdf';
import axios from 'axios';
import TrafficChart from '../../components/common/chart/TrafficChart';
import { Buffer } from 'buffer';
import finalImage from '../../assets/final.png';

const defaultStyle = {
  border: '1px solid gray',
  display: 'inline-block',
  margin: '1rem',
};

function Modal({ show, handleClose, children }) {
  return (
    <div
      style={{
        display: show ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '1rem',
          borderRadius: '5px',
        }}
      >
        {children}
        <button onClick={handleClose} className="btn btn-primary">
          닫기
        </button>
      </div>
    </div>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Sign({
  suggestionItemData,
  suggestionItemNumber,
  suggestionId,
  rtcRoomNum,
}) {
  console.log(suggestionItemNumber);
  const ws = useRef(null);
  const [signatureCoordinates, setSignatureCoordinates] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [pdfUrls, setPdfUrls] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [receivedPdfUrl, setReceivedPdfUrl] = useState(null); // New state to hold the received PDF URL
  const canvasRef = useRef(null);
  const array = useRef([]).current;
  const ctxRef = useRef(null);
  const isWsOpen = useRef(false); // Track WebSocket connection state
  const [showFinalImage, setShowFinalImage] = useState(false);

  const query = useQuery();
  const pbId = query.get('pbId');
  const vipId = query.get('vipId');

  useEffect(() => {
    ws.current = new WebSocket(
      `${process.env.REACT_APP_SUGGESTIONLISTWS}/${rtcRoomNum}`
    );
    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
      isWsOpen.current = true; // Set the WebSocket connection state to true
    };

    ws.current.onmessage = async (event) => {
      alert('서명완료');
      try {
        console.log('Message from server:', event);
        if (event.data instanceof Blob) {
          const blobUrl = URL.createObjectURL(event.data);
          setReceivedPdfUrl(blobUrl); // Set the received PDF URL
          alert('서명이 성공적으로 수신되었습니다.');
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.current.onclose = () => {
      isWsOpen.current = false; // Set the WebSocket connection state to false
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    getPdf();
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      context.lineJoin = 'round';
      context.lineWidth = 3;
      context.strokeStyle = 'black';
      ctxRef.current = context;
    }
  }, []);

  const getPdf = () => {
    axios
      .post(
        `http://${process.env.REACT_APP_BESERVERURI}/api/contract/finalcontract`,
        {
          fundIds: suggestionItemData,
        }
      )
      .then((response) => {
        const tmp = response.data.map((item, index) => ({
          ...item.fundContracts[0],
          id: index,
        }));
        setPdfUrls(tmp);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const canvasEventListener = (event, type) => {
    if (!ctxRef.current) {
      console.error('Canvas context is not initialized');
      return;
    }
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    if (type === 'down') {
      setIsDrawing(true);
      array.push({ x, y });
    } else if (type === 'move' && isDrawing) {
      const ctx = ctxRef.current;
      if (array.length === 0) {
        array.push({ x, y });
      } else {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(array[array.length - 1].x, array[array.length - 1].y);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        array.push({ x, y });
      }
    } else if (type === 'up' || type === 'leave') {
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      array.length = 0;
    }
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    setImageURL(image);

    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        if (blob.type !== 'image/png') {
          alert('The image is not in PNG format!');
          return;
        }
        // Ensure WebSocket is open before sending
        if (isWsOpen.current) {
          ws.current.send(blob);
        } else {
          console.error('WebSocket is not open');
        }
      });
    pdfSetting(image);
  };

  const pdfSetting = async (image) => {
    const updatedPdfUrls = await Promise.all(
      pdfUrls.map(async (pdfUrl) => {
        const response = await fetch(pdfUrl.pdfUrl);
        const pdfFile = await response.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfFile);
        const page = pdfDoc.getPages()[0]; // Get the first page

        if (!image.startsWith('data:image/png')) {
          alert('The image is not in PNG format!');
          return pdfUrl; // Return the original pdfUrl without changes
        }

        const pngImageBytes = await fetch(image).then((res) =>
          res.arrayBuffer()
        );
        const pngImage = await pdfDoc.embedPng(pngImageBytes);

        const { width, height } = page.getSize();
        const x = width - 200;
        const y = height / 8 - 15;

        if (signatureCoordinates) {
          page.drawRectangle({
            x: signatureCoordinates.x,
            y: signatureCoordinates.y,
            width: 150,
            height: 70,
            color: rgb(1, 1, 1),
            opacity: 1,
          });
        }

        page.drawImage(pngImage, {
          x,
          y,
          width: 150,
          height: 70,
        });
        setSignatureCoordinates({ x, y });
        const pdfBytes = await pdfDoc.save();
        const base64pdf = Buffer.from(pdfBytes).toString('base64');
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        // Send the signed PDF through WebSocket
        if (isWsOpen.current) {
          ws.current.send(blob);
        } else {
          console.error('WebSocket is not open');
        }

        const url = URL.createObjectURL(blob);

        return { ...pdfUrl, pdfUrl: url, signedContract: base64pdf };
      })
    );

    setPdfUrls(updatedPdfUrls);
    clearCanvas();
    setShowModal(false);
  };

  const signNow = () => {
    setShowModal(true);
  };

  const givePdf = () => {
    if (signatureCoordinates == null) {
      alert('서명을 해주세요');
      return;
    }
    const contracts = [];
    for (let i = 0; i < suggestionItemData.length; i++) {
      let pushItem = {
        fundId: suggestionItemData[i],
        signedContract: pdfUrls[i].signedContract,
      };
      contracts.push(pushItem);
    }
    axios
      .post(`http://${process.env.REACT_APP_BESERVERURI}/api/contract`, {
        suggestionId: suggestionId,
        vipId: vipId,
        pbId: pbId,
        contracts: contracts,
      })
      .then((response) => {
        alert('상품 가입이 완료되었습니다.');
        setShowFinalImage(true);
        console.log(response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div id="signDiv">
      {showFinalImage ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <img src={finalImage} alt="Final" style={{ maxWidth: '60%' }} />
        </div>
      ) : (
        <>
          <Modal show={showModal} handleClose={() => setShowModal(false)}>
            <canvas
              ref={canvasRef}
              style={defaultStyle}
              onMouseDown={(event) => {
                canvasEventListener(event, 'down');
              }}
              onMouseMove={(event) => {
                canvasEventListener(event, 'move');
              }}
              onMouseLeave={(event) => {
                canvasEventListener(event, 'leave');
              }}
              onMouseUp={(event) => {
                canvasEventListener(event, 'up');
              }}
            />
            <button onClick={clearCanvas} className="btn btn-primary">
              초기화
            </button>
            <button onClick={saveCanvas} className="btn btn-primary">
              확인
            </button>
          </Modal>
          <div id="finalPortfolio">
            <div id="portfolioContainer">
              <TrafficChart data={suggestionItemNumber} name="최종수정안" />
            </div>
          </div>
          <div id="finalContract">
            <div>
              <h3 className="final-title">최종계약서</h3>
            </div>
            <div id="finalPdf">
              {pdfUrls.map((data, index) => (
                <div key={index}>
                  <h5 id="final-title">{data.title}</h5>
                  <Pdf
                    pdfFile={receivedPdfUrl ? receivedPdfUrl : data.pdfUrl}
                  />
                </div>
              ))}
            </div>
            <button onClick={signNow} className="btn-sign btn btn-primary">
              서명
            </button>
            <button onClick={givePdf} className="btn-sign btn btn-primary">
              최종가입
            </button>
          </div>
        </>
      )}
    </div>
    // <div id="signDiv">
    //   <Modal show={showModal} handleClose={() => setShowModal(false)}>
    //     <canvas
    //       ref={canvasRef}
    //       style={defaultStyle}
    //       onMouseDown={(event) => {
    //         canvasEventListener(event, 'down');
    //       }}
    //       onMouseMove={(event) => {
    //         canvasEventListener(event, 'move');
    //       }}
    //       onMouseLeave={(event) => {
    //         canvasEventListener(event, 'leave');
    //       }}
    //       onMouseUp={(event) => {
    //         canvasEventListener(event, 'up');
    //       }}
    //     />
    //     <button onClick={clearCanvas} className="btn btn-primary">
    //       초기화
    //     </button>
    //     <button onClick={saveCanvas} className="btn btn-primary">
    //       확인
    //     </button>
    //   </Modal>
    //   <div id="finalPortfolio">
    //     <div id="portfolioContainer">
    //       <TrafficChart data={suggestionItemNumber} name="최종수정안" />
    //     </div>
    //   </div>
    //   <div id="finalContract">
    //     <div>
    //       <h3 className="final-title">최종계약서</h3>
    //     </div>
    //     <div id="finalPdf">
    //       {pdfUrls.map((data, index) => (
    //         <div key={index}>
    //           <h5 id="final-title">{data.title}</h5>
    //           <Pdf pdfFile={receivedPdfUrl ? receivedPdfUrl : data.pdfUrl} />
    //         </div>
    //       ))}
    //     </div>
    //     <button onClick={signNow} className="btn-sign btn btn-primary">
    //       서명
    //     </button>
    //     <button onClick={givePdf} className="btn-sign btn btn-primary">
    //       최종가입
    //     </button>
    //   </div>
    // </div>
  );
}

export default Sign;
