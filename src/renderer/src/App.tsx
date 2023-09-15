import { useEffect, useRef, useState, on } from 'react'
import Button from '@components/Button'
import useAlertsStore from './store/alerts'
import { Terminal } from 'xterm'

// Some code for testing the Conditional component

function App(): JSX.Element {
  const [isScriptRunning, setIsScriptRunning] = useState(false)
  const [count, setCount] = useState(0)
  const termContainer = useRef(null)

  let terminal: Terminal | null = null
  let cols = 10

  const clearTerminal = () => {
    if (terminal != null) {
      terminal.write('\x1b[2J')
      terminal.write('\x1b[u')
    }
  }

  useEffect(() => {
    terminal = new Terminal()
    terminal.write('\x1b[s')
    if (termContainer.current != null) {
      terminal.open(termContainer.current)
    }
    return () => {
      if (terminal) terminal.dispose()
    }
  }, [])

  useEffect(() => {
    window.electron.ipcRenderer.on('stdout', (event, data) => {
      let lines = data.split('\n')
      clearTerminal()
      console.log(data)
      for (let line of lines) terminal?.writeln(line)
    })
  }, [])

  let { queueAlert } = useAlertsStore()

  const executeScript = () => {
    if (isScriptRunning) return

    // Run the Script
    window.ipcRenderer.send('runScript')

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
        <p slot="text">Add atom</p>
      </Button>
      <div ref={termContainer} className="terminalContainer"></div>
    </>
  )
}

export default App
