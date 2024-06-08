import React, { useEffect, useRef } from 'react';

function ConsultRegister() {
  const editorRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.ckeditor.com/4.15.1/standard/ckeditor.js';
    script.async = true;
    script.onload = () => {
      window.CKEDITOR.replace(editorRef.current, {
        height: '40vh',
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
        >
          <i className='bi bi-save'></i> 저장하기
        </button>
      </div>
    </main>
  );
}

export default ConsultRegister;
