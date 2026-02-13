import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const html = document.documentElement;
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

const applyTheme = () => {
  const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', theme);
};

applyTheme(); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);