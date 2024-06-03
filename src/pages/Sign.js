import React, { useRef, useEffect, useState } from 'react';
import Pdf from '../components/common/Pdf';
import { PDFDocument, rgb } from 'pdf-lib';

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

function Sign() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [pdfUrl, setPdfUrl] = useState(
    'https://hanaro-meteor.s3.ap-northeast-2.amazonaws.com/contract/pdf/7a2337f9-724b-4a2b-8cc8-649983056768.pdf'
  );
  const [pdfFile, setPdfFile] = useState(null);
  const [signatureCoordinates, setSignatureCoordinates] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const canvasRef = useRef(null);
  const array = useRef([]).current;
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      context.lineJoin = 'round';
      context.lineWidth = 3;
      context.strokeStyle = 'black';
      ctxRef.current = context;
    }

    // Load PDF file
    fetch(pdfUrl)
      .then((res) => res.arrayBuffer())
      .then((data) => {
        setPdfFile(data);
      });
  }, [pdfUrl]);

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

  const saveCanvas = async () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    setImageURL(image);

    if (pdfFile) {
      const pdfDoc = await PDFDocument.load(pdfFile);
      const page = pdfDoc.getPages()[0];

      const pngImageBytes = await fetch(image).then((res) => res.arrayBuffer());
      const pngImage = await pdfDoc.embedPng(pngImageBytes);

      const { width, height } = page.getSize();
      const x = width - 150;
      const y = height / 8 - 75;
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
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      clearCanvas();
      setShowModal(false); // 모달을 닫음
    }
  };

  const signNow = () => {
    setShowModal(true);
  };

  return (
    <div id="signDiv">
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
      <Pdf pdfFile={pdfUrl} />
      <button onClick={signNow} className="btn btn-primary">
        서명
      </button>
    </div>
  );
}

export default Sign;
