import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import App from './App.jsx';
import './index.css';

const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer position='top-right' />
  </React.StrictMode>
);
