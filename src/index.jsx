import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { Provider } from 'react-redux';
import store from './helpers/store';
import Page from './components/common/Page';

ReactDOM.render((
  <Provider store={store}>
    <Page />
  </Provider>
), document.getElementById('root'));
