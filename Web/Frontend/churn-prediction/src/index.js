import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure you're using 'react-dom/client' for React 18+
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
