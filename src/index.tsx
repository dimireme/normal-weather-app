import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from 'store';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/reset.css';
import 'styles/common.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer position="bottom-right" />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
