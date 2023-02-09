import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppProvider from './context/AppContext';
import App from './routes/app';
import Scaffold from './routes/scaffold';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/ss/:id?" element={<Scaffold />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
