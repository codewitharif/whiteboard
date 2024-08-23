import React, { useState, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {
  FaPencilAlt,
  FaEraser,
  FaUndo,
  FaRedo,
  FaDownload,
  FaTrash,
} from "react-icons/fa";

const App = () => {
  const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
  };

  const [strokeColor, setStrokeColor] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [eraserMode, setEraserMode] = useState(false);
  const [canvasColor, setCanvasColor] = useState("white");

  const canvasRef = useRef(null);

  const handleEraser = () => {
    setEraserMode(true);
  };

  const handlePen = () => {
    setEraserMode(false);
  };

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  };

  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const handleRedo = () => {
    if (canvasRef.current) {
      canvasRef.current.redo();
    }
  };

  const handleExportImage = () => {
    if (canvasRef.current) {
      canvasRef.current
        .exportImage("png")
        .then((data) => {
          const link = document.createElement("a");
          link.href = data;
          link.download = "canvas-image.png";
          link.click();
        })
        .catch((e) => {
          console.error("Failed to export image: ", e);
        });
    }
  };

  return (
    <div>
      <div>
        <label>Pen Color: </label>
        <input
          type="color"
          value={strokeColor}
          onChange={(e) => setStrokeColor(e.target.value)}
          disabled={eraserMode}
        />
        <label>Pen Width: </label>
        <input
          type="number"
          min="1"
          max="20"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
        />
        <label>Background Color: </label>
        <input
          type="color"
          value={canvasColor}
          onChange={(e) => setCanvasColor(e.target.value)}
        />
        {/* </div> */}

        {/* <div style={{ margin: "20px 0" }}> */}
        <button onClick={handlePen}>
          <FaPencilAlt /> Pen
        </button>
        <button onClick={handleEraser}>
          <FaEraser /> Eraser
        </button>
        <button onClick={handleClearCanvas}>
          <FaTrash /> Clear Canvas
        </button>
        <button onClick={handleUndo}>
          <FaUndo /> Undo
        </button>
        <button onClick={handleRedo}>
          <FaRedo /> Redo
        </button>
        <button onClick={handleExportImage}>
          <FaDownload /> Download Image
        </button>
      </div>

      <ReactSketchCanvas
        ref={canvasRef}
        style={styles}
        width="600"
        height="100vh"
        strokeWidth={eraserMode ? strokeWidth : strokeWidth}
        strokeColor={eraserMode ? canvasColor : strokeColor}
        canvasColor={canvasColor}
      />
    </div>
  );
};

export default App;
