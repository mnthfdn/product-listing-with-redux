import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore();

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

reportWebVitals();
