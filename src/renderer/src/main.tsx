import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee , faGears} from '@fortawesome/free-solid-svg-icons'

/*
Procedure to add icons:
1.  Import the icon from @fortawesome/free-solid-svg-icons
    import { faCoffee } from '@fortawesome/free-solid-svg-icons'
2.  Add the icon to the icons array
*/
let icons = [faCoffee, faGears]

for (let icon of icons) library.add(icon)

// Declaring the ipcRenderer property on Window interface
// to suppress Typescript errors
declare global {
    interface Window { ipcRenderer: any; }
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
