import React from 'react';
import { createRoot } from 'react-dom/client'; 
import './index.css';
import App from './App';
import { store } from './redux/store.jsx';
import { Provider } from 'react-redux';

const root = document.getElementById('root');
const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <App style={{ overflow: 'hidden' }} />
    </Provider>
  </React.StrictMode>
);
