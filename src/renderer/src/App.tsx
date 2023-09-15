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
    window.electron.ipcRenderer.send('runScript')

    // set scriptRunning variable to true
    setIsScriptRunning(true)

    // reset it to false after 3 seconds
    setTimeout(() => {
      setIsScriptRunning(false)
    }, 3000)
  }

  return (
    <>
      <Button onClick={executeScript}>
        <p slot="text">Execute script</p>
      </Button>
      <div ref={termContainer} className="terminalContainer"></div>
    </>
  )
}

export default App
