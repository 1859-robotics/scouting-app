import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/App.js'
import registerServiceWorker from './registerServiceWorker'

import scoutingApp from './reducers'

import "./style/style.css"
// TODO: make an actual style system or something idk

const store = createStore(scoutingApp)

window.erots = store

ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
