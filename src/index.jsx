import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { Provider } from 'react-redux';
import store from './helpers/store';
import Page from './components/Page';
import 'regenerator-runtime/runtime';

ReactDOM.render((
  <Provider store={store}>
    <Page />
  </Provider>
), document.getElementById('root'));
