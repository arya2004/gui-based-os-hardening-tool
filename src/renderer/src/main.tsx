import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(faCoffee)

declare global {
    interface Window { ipcRenderer: any; }
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
