import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/materialize-css/dist/css/materialize.min.css"
import "../node_modules/materialize-css/dist/js/materialize.min.js"
import App from './App';
import "./styles/styles.css"
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


