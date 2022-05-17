import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { YMaps } from 'react-yandex-maps';

import { store } from 'store';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/reset.css';
import 'styles/common.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Can't use <React.StrictMode> coz map rendering twice.
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <YMaps>
        <App />
      </YMaps>
      <ToastContainer position="bottom-right" />
    </Provider>
  </BrowserRouter>
);
