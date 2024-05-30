import React, { useEffect, useState, useRef } from 'react';

const ProgressBarPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const ws = useRef(null);

  useEffect(() => {
      ws.current = new WebSocket('ws://localhost:8888');


      ws.current.onopen = () => {
        console.log('WebSocket connection opened');
        ws.current.send(JSON.stringify({ type: 'getCurrentStep' }));
    };

      ws.current.onmessage = (event) => {
        const receivedData = JSON.parse(event.data);
        if (receivedData.type === 'updateStep') {
            setCurrentStep(receivedData.step);
          }
      };
      return () => {
          ws.current.close();
      };
  }, []);

  const updateProgress = (step) => {
    console.log("click");
    setCurrentStep(step);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ type: 'updateStep', step }));
    }
  };

    return (
      <div id="divProgressBar">
      <div id="progressContainer">
          <div
              id="progress"
              style={{
                  width: `${
                      ((currentStep - 1) / (totalSteps - 1)) * 100
                  }%`,
              }}
          ></div>
          {[...Array(totalSteps)].map((_, index) => (
              <div
                  key={index}
                  className="progressCircle"
                  onClick={() => updateProgress(index + 1)}
                  style={{
                      backgroundColor:
                          index < currentStep ? '#316df4' : '#ffffff',
                      color: index < currentStep ? 'white' : '#316df4',
                  }}
              >
                  {index + 1}
              </div>
          ))}
      </div>
      <div id="progressButtons">
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
          >
              Next
          </button>
      </div>
  </div>
    );
};

export default ProgressBarPage;
