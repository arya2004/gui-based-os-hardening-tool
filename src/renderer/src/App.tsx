import { useEffect, useRef, useState, on } from 'react'
import Button from '@components/Button'
import Icon from '@components/Icon'
import Alert from './components/Alert'
import useAlertsStore from './store/alerts'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'

// Some code for testing the Conditional component

function App(): JSX.Element {
  const [isScriptRunning, setIsScriptRunning] = useState(false)
  const [count, setCount] = useState(0)
  const termContainer = useRef(null)

  useEffect(() => {
    const terminal = new Terminal()
    if (termContainer.current != null) {
      terminal.open(termContainer.current)
      const fitAddon = new FitAddon()
      terminal.loadAddon(fitAddon)
      fitAddon.fit()
      terminal.write('Hehe boi 69 420')
    }
    return () => {
      terminal.dispose()
    }
  }, [])

  // useEffect(() => {
  //   window.electron.ipcRenderer.on('stdout', (event, data) => {
  //     console.log('this ran')
  //     setStdout(data)
  //   })
  // }, [])

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
