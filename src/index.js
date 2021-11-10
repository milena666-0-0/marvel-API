import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

import './style/styles.scss';

ReactDOM.render(
  <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
