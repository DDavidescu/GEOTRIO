import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './context/UserContext';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(BrowserRouter, { basename: import.meta.env.BASE_URL, children: _jsx(UserProvider, { children: _jsx(App, {}) }) }) }));
