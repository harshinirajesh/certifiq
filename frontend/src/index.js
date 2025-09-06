import React from 'react';
import "./App.css";
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your entire app with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

