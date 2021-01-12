import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from '@/pages/app';
import reducer from '@/reducer';
import './index.global.css';

const store = configureStore({ reducer });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
