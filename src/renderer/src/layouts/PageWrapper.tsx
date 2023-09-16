import Sidebar from '@renderer/components/Sidebar'
import { ReactElement } from 'react'

export default function PageWrapper({ children }): JSX.Element {
  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}
