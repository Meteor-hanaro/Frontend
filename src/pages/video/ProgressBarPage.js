import React, { useEffect, useState, useRef } from "react";

const ProgressBarPage = ({ setPageNumber }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://54.180.102.224:8890");

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
      ws.current.send(JSON.stringify({ type: "getCurrentStep" }));
    };

    // 페이지 번호 데이터 수신
    ws.current.onmessage = (event) => {
      const receivedData = event.data;
      receivedData.text().then((text) => {
        if (JSON.parse(text).type === "updateStep") {
          setPageNumber(JSON.parse(text).step);
          setCurrentStep(JSON.parse(text).step);
        }
      });
    };
    return () => {
      ws.current.close();
    };
  }, []);

  const updateProgress = (step) => {
    console.log("click");
    setPageNumber(step); // 페이지 변경용 useState
    setCurrentStep(step); // 동시성 유지를 위한 useState
    // 페이지 번호 변경할 때마다 데이터 전송
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "updateStep", step }));
    }
  };

  return (
    <div id="divProgressBar">
      <div id="progressContainer">
        <div
          id="progress"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
        ></div>
        {[...Array(totalSteps)].map((_, index) => (
          <div
            key={index}
            className="progressCircle"
            onClick={() => updateProgress(index + 1)}
            style={{
              backgroundColor: index < currentStep ? "#316df4" : "#ffffff",
              color: index < currentStep ? "white" : "#316df4",
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
