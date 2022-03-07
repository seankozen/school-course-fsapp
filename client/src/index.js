import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from './Context';

// CSS style sheets
import './styles/reset.css';
import './styles/global.css';

//import reportWebVitals from './reportWebVitals';
//import './index.css';


ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
