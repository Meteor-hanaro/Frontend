import React, { useEffect, useState, useRef } from 'react';

const ProgressBarPage = ({ setPageNumber }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://${process.env.REACT_APP_PROGRESSWS}`);

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
      ws.current.send(JSON.stringify({ type: 'getCurrentStep' }));
    };

    ws.current.onmessage = (event) => {
      const receivedData = event.data;
      receivedData.text().then((text) => {
        if (JSON.parse(text).type === 'updateStep') {
          setPageNumber(JSON.parse(text).step);
          setCurrentStep(JSON.parse(text).step);
        }
      });
    };

    return () => {
      ws.current.close();
    };
  }, [setPageNumber]);

  const updateProgress = (step) => {
    setPageNumber(step);
    setCurrentStep(step);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'updateStep', step }));
    }
  };

  const stepLabels = ['리밸런싱', '신분증확인', '계약서동의', '간편인증', '최종가입'];

  return (
    <div id="divProgressBar">
      <div id="progressContainer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '80%', margin: '0 auto' }}>
        {stepLabels.map((label, index) => (
          <div key={index} style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
            <div
              className="progressCircle"
              onClick={() => updateProgress(index + 1)}
              style={{
                backgroundColor: index < currentStep ? '#e0c886' : '#E0E0E0',
                color: index < currentStep ? 'white' : 'black',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                margin: '0 auto',
              }}
            >
              {index + 1}
            </div>
            <div style={{ marginLeft: '10px', color: index < currentStep ? '#e0c886' : 'black' }}>{label}</div>
          </div>
        ))}
      </div>
      <div id="progressButtons" style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => updateProgress(currentStep - 1)}
          disabled={currentStep === 1}
        >
          Prev
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => updateProgress(currentStep + 1)}
          disabled={currentStep === totalSteps}
          style={{ marginLeft: '10px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProgressBarPage;
