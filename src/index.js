import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/App.js'
import registerServiceWorker from './registerServiceWorker'

import scoutingApp from './reducers'

const store = createStore(scoutingApp)

window.erots = store

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
