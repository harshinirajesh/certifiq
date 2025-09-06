// src/App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TemplateSelection from "./components/TemplateSelection";
import BulkCertificate from "./components/BulkCertificate";

function App() {
  const [templateConfig, setTemplateConfig] = useState(null);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Step 1: Template Selection */}
        <Route
          path="/template"
          element={<TemplateSelection onSave={(config) => setTemplateConfig(config)} />}
        />
        {/* Step 2: Bulk Generation */}
        <Route
          path="/upload"
          element={<BulkCertificate templateConfig={templateConfig} />}
        />
      </Routes>
    </div>
  );
}

export default App;
