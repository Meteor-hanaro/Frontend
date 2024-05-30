import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios';

const defaultStyle = { border: '1px solid gray', display: 'inline-block', margin: '1rem' }

function Sign() {
  const [ctx, setCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageURL, setImageURL] = useState('');

  const canvasRef = useRef(null);
  const array = useRef([]).current;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineJoin = 'round';
    context.lineWidth = 3;
    context.strokeStyle = 'black';
    setCtx(context);
  }, [])

  const canvasEventListener = (event, type) => {
    let x = event.clientX - event.target.offsetLeft;
    let y = event.clientY - event.target.offsetTop;

    if (type === 'down') {
      setIsDrawing(true);
      array.push({ x, y });
    } else if (type === 'move' && isDrawing) {
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
  }

  const clearCanvas = () => {
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      array.length = 0; // clear the array
    }
  }
  const saveCanvas = async () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    setImageURL(image);
    try {
      const response = await axios.post('http://localhost:8080/api/id/combinePdf', {
        image: image,
        // filePath: 'C:/Users/YourUsername/Desktop/input.pdf', // 바탕화면에 있는 PDF 파일 경로
      });
      if (response.status === 200) {
        alert('Signature added to PDF successfully!');
      }
    } catch (error) {
      console.error('Error saving signature:', error);
      alert('Failed to add signature to PDF',error);
    }
  };
  return (
    <div className='container'>
      <canvas
        ref={canvasRef}
        style={defaultStyle}
        onMouseDown={(event) => { canvasEventListener(event, 'down') }}
        onMouseMove={(event) => { canvasEventListener(event, 'move') }}
        onMouseLeave={(event) => { canvasEventListener(event, 'leave') }}
        onMouseUp={(event) => { canvasEventListener(event, 'up') }}
      >
      </canvas>
      <button onClick={clearCanvas}>초기화</button>
      <button onClick={saveCanvas}>확인</button>
      {imageURL && (
        <div>
          <h3>저장된 서명</h3>
          <a href={imageURL} download="signature.png">서명 다운로드</a>
          <img src={imageURL} alt="Saved Signature" style={{ display: 'block', marginTop: '1rem', border: '1px solid gray' }} />
        </div>
      )}
    </div>
  );
}

export default Sign;