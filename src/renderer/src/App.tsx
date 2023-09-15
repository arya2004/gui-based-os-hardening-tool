import { useEffect, useRef, useState } from 'react'
import Button from '@components/Button'
import useAlertsStore from './store/alerts'
import { Terminal } from 'xterm'
import useTerminal from './store/logs'

// Some code for testing the Conditional component

function App(): JSX.Element {
  const [isScriptRunning, setIsScriptRunning] = useState(false)
  const [count, setCount] = useState(0)
  const termContainer = useRef(null)

  let term = useTerminal()

  useEffect(() => {
    term.createTerminal()
    if (termContainer.current) term.setupTerminal(termContainer.current)

    return () => term.disposeTerminal()
  }, [])

  const executeScript = () => {
    if (isScriptRunning) return

    // Run the Script
  }

  return (
    <>
      <Button onClick={() => window.electron.ipcRenderer.send('runScript', 'install')}>
        <p slot="text">Install Lynis</p>
      </Button>

      <Button onClick={() => window.electron.ipcRenderer.send('runScript', 'audit')}>
        <p slot="text">Audit System</p>
      </Button>

      <Button onClick={() => window.electron.ipcRenderer.send('runScript', 'uninstall')}>
        <p slot="text">Uninstall Lynis</p>
      </Button>

      <div ref={termContainer} className="terminalContainer"></div>
    </>
  )
}

export default App
