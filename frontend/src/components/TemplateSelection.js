import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Template1 from "../assets/template1.png";
import Template2 from "../assets/template2.png";
import "../App.css";

function TemplateSelection({ onSave }) {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [fontSize, setFontSize] = useState(32);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontColor, setFontColor] = useState("#000000");
  const [position, setPosition] = useState({ x: 200, y: 200 });

  const [templateDimensions, setTemplateDimensions] = useState({
    naturalWidth: 0,
    naturalHeight: 0,
    previewWidth: 0,
    previewHeight: 0,
  });

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Fixed preview width
  const PREVIEW_WIDTH = 800;

  const handleMouseDown = (e) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (dragging.current) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const handleImageLoad = (e) => {
    const naturalWidth = e.target.naturalWidth;
    const naturalHeight = e.target.naturalHeight;
    const aspectRatio = naturalHeight / naturalWidth;

    setTemplateDimensions({
      naturalWidth,
      naturalHeight,
      previewWidth: PREVIEW_WIDTH,
      previewHeight: PREVIEW_WIDTH * aspectRatio,
    });

    console.log("Template loaded:", naturalWidth, naturalHeight);
  };

  const handleSave = () => {
    const xRatio = position.x / templateDimensions.previewWidth;
    const yRatio = position.y / templateDimensions.previewHeight;

    const config = {
      template: selectedTemplate,
      fontSize,
      fontFamily,
      fontColor,
      position: { xRatio, yRatio },
      previewWidth: templateDimensions.previewWidth,
      previewHeight: templateDimensions.previewHeight,
      naturalWidth: templateDimensions.naturalWidth,
      naturalHeight: templateDimensions.naturalHeight,
    };

    console.log("Saved config:", config);
    onSave(config);
    navigate("/upload");
  };

  const templateSrc = selectedTemplate === "template1" ? Template1 : Template2;

  return (
    <div
      className="upload-page"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h2>Customize Template</h2>

      <div className="template-options">
        <img
          src={Template1}
          alt="Template 1"
          className={selectedTemplate === "template1" ? "selected" : ""}
          onClick={() => setSelectedTemplate("template1")}
        />
        <img
          src={Template2}
          alt="Template 2"
          className={selectedTemplate === "template2" ? "selected" : ""}
          onClick={() => setSelectedTemplate("template2")}
        />
      </div>

      <div className="preview-container">
        <div
          className="certificate-preview"
          style={{ position: "relative", display: "inline-block" }}
        >
          <img
            src={templateSrc}
            alt="Certificate Preview"
            onLoad={handleImageLoad}
            style={{
              width: templateDimensions.previewWidth || "auto",
              height: templateDimensions.previewHeight || "auto",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: position.y,
              left: position.x,
              fontSize: `${fontSize *
                (templateDimensions.previewWidth /
                  templateDimensions.naturalWidth)}px`, // 🔑 scale font in preview
              fontFamily,
              color: fontColor,
              cursor: "move",
              userSelect: "none",
            }}
            onMouseDown={handleMouseDown}
          >
            {"{{Name}}"}
          </div>
        </div>
      </div>

      <div className="controls">
        <label>
          Font Size (px):
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </label>

        <label>
          Font Family:
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Garamond">Garamond</option>
          </select>
        </label>

        <label>
          Font Color:
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
          />
        </label>
      </div>

      <button className="upload-button" onClick={handleSave}>
        Save & Continue
      </button>
    </div>
  );
}

export default TemplateSelection;
