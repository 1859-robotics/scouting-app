import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/App.js'
import registerServiceWorker from './registerServiceWorker'

import scoutingApp from './reducers/index.js'

import { cache } from "vexdb"

// TODO: make an actual style system or something idk
import "./style/style.css"


let persist = {}
try {
  persist = JSON.parse(localStorage.getItem('state'));
} catch(e) {
  // TODO: maybe add error handling here idk
  // TODO: stop using idk so much, people hate you alex
}


const store = createStore(scoutingApp, persist || {})

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()))
  cache.clear() // TODO: put in an issue for high volume cache read/write and an option to not use it
})

export { store } // TODO: Learn more about exports in js

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
