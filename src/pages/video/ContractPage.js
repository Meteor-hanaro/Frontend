import React, { useEffect, useRef, useState } from 'react';

const ContractPage = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const img = new Image();
        img.src = `${process.env.PUBLIC_URL}/assets/img/contract.jpg`;
        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }, []);

    const startDrawing = (event) => {
        const { offsetX, offsetY } = event.nativeEvent;
        setIsDrawing(true);
        setLastPos({ x: offsetX, y: offsetY });
    };

    const draw = (event) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { offsetX, offsetY } = event.nativeEvent;
        ctx.strokeStyle = 'black'; // Drawing color
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 3; // Drawing width
        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        setLastPos({ x: offsetX, y: offsetY });
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    return (
        <div id="divContract">
            <div id="canvasContainer">
                <canvas
                    id="contractCanvas"
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />
            </div>
        </div>
    );
};

export default ContractPage;
