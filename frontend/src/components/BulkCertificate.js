import React, { useState } from "react";
import axios from "axios";

function BulkCertificate({ templateConfig }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [readyToDownload, setReadyToDownload] = useState(false);

  const handleChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !templateConfig) {
      setStatus("Select a template and file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("templateConfig", JSON.stringify(templateConfig));

    console.log("Sending templateConfig to backend:", templateConfig);

    try {
      setStatus("Generating certificates...");

      const response = await axios.post(
        "http://localhost:3000/bulk-generate",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.zipFile) {
        setStatus("Certificates generated! Ready to download.");
        setReadyToDownload(true);
      }
    } catch (err) {
      console.error("Error generating certificates:", err);
      setStatus(
        err.response?.data || "Error generating certificates. Check server."
      );
    }
  };

  const handleDownload = () => {
    window.location.href = "http://localhost:3000/download-zip";
  };

  return (
    <div className="upload-page">
      <h2>Upload Excel for Bulk Certificates</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={handleChange}
          required
        />
        <button type="submit">Generate Certificates</button>
      </form>

      {status && <p>{status}</p>}
      {readyToDownload && <button onClick={handleDownload}>Download ZIP</button>}
    </div>
  );
}

export default BulkCertificate;
