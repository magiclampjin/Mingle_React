import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/* global dataLayer */

const googleAnalyticsId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
console.log('Google Analytics ID:', googleAnalyticsId);

// Google Analytics 스크립트 동적으로 생성
const scriptElement = document.createElement('script');
scriptElement.async = true;
scriptElement.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;

document.head.appendChild(scriptElement);

// 스크립트 로드 완료 후 실행될 콜백 함수
scriptElement.onload = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', googleAnalyticsId);
};