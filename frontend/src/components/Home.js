import React from "react";
import image from "../image/image.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <header>
        <div className="logo">CertifiQ</div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="text">
            <h1>
              Create Certificates
              <br />
              That Inspire Achievement
            </h1>
            <p>
              Empower recognition by designing and distributing professional
              certificates effortlessly.
            </p>
            <button
              className="get-started"
              onClick={() => navigate("/template")}
            >
              Get Started
            </button>
          </div>

          <div className="image">
            <img src={image} alt="Certificate Sample" />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works">
        <h2>How does it work?</h2>
        <p>Simplify certificate management in three easy steps</p>

        <div className="steps">
          {/* Step 1 */}
          <div className="step">
            <h3>1</h3>
            <p>
              <strong>Upload Data</strong>
              <br />
              Import participant details from a file for bulk generation.
            </p>
          </div>

          {/* Step 2 */}
          <div className="step">
            <h3>2</h3>
            <p>
              <strong>Customize Certificates</strong>
              <br />
              Choose templates and personalize content.
            </p>
          </div>

          {/* Step 3 */}
          <div className="step">
            <h3>3</h3>
            <p>
              <strong>Automate Distribution</strong>
              <br />
              Send certificates via email or download in bulk.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© CertifiQ 2025. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
