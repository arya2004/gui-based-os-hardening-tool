import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import './assets/terminal.css'

import Home from '@pages/Home'
import Audit from '@pages/Audit'
import Firewall from '@pages/Firewall'
import PageWrapper from './layouts/PageWrapper'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faGears } from '@fortawesome/free-solid-svg-icons'
import { createHashRouter, RouterProvider } from 'react-router-dom'

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
  interface Window {
    ipcRenderer: any
  }
}

export interface ConditionalProps {
  condition?: boolean
  slot?: string
}

export interface ClassNameProp {
  className?: string
}

export interface CommonProps extends ConditionalProps, ClassNameProp {}

const router = createHashRouter([
  {
    path: '/',
    element: (
      <PageWrapper>
        <Home />
      </PageWrapper>
    )
  },
  {
    path: '/audit',
    element: (
      <PageWrapper>
        <Audit />
      </PageWrapper>
    )
  },
  {
    path: '/firewall',
    element: (
      <PageWrapper>
        <Firewall />
      </PageWrapper>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div>
    <RouterProvider router={router} />
  </div>
)
