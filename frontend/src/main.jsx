import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store as myStore} from './Store/store.js'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={myStore}>
      <App />
  </Provider>
  // <React.StrictMode>
  //   <Provider store ={myStore}>
  //     <App />
  //   </Provider>
  // </React.StrictMode>,
)
