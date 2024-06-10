import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';

function ConsultRegister() {
  const editorRef = useRef(null);
  const params = useParams();
  const [consultId, setConsultId] = useState(params.consultId);
  const [content, setContent] = useState('');

  const register = () => {
    const url = `http://${process.env.REACT_APP_BESERVERURI}/api/consult/write`;
    const data = {
      consultId: params.consultId,
      content: content,
    };

    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        window.close();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.ckeditor.com/4.15.1/standard/ckeditor.js';
    script.async = true;
    script.onload = () => {
      window.CKEDITOR.replace(editorRef.current, {
        height: '40vh',
        on: {
          change: (event) => {
            setContent(event.editor.getData());
          },
        },
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main
      id='main'
      className='main'
      style={{
        padding: '45px',
        height: `calc(100vh - 60px)`,
      }}
    >
      <div
        className='card info-card'
        style={{
          height: '100%',
          padding: '4% 4%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span
          style={{
            marginBottom: '15px',
            fontSize: '20px',
            fontWeight: '600',
            color: '#D7B863',
          }}
        >
          상담 결과 작성
        </span>
        <div>
          <div ref={editorRef}></div>
        </div>
        <br />
        <button
          type='button'
          className='pbBtn'
          style={{ width: '100px', marginLeft: 'calc(100% - 100px)' }}
          onClick={register}
        >
          <i className='bi bi-save'></i> 저장하기
        </button>
      </div>
    </main>
  );
}

export default ConsultRegister;
