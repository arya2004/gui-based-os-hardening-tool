import useTerminal from '@renderer/store/logs'
import { useEffect, useRef } from 'react'
import Button from '@renderer/components/Button'

export default function File(): JSX.Element {
  let term = useTerminal()
  let terminalContainer = useRef(null)

  useEffect(() => {
    term.createTerminal()
    if (terminalContainer.current) term.setupTerminal(terminalContainer.current)
    return () => term.disposeTerminal()
  }, [])

  return (
    <div className="audit">
      <div className="flex">
        <Button onClick={() => window.electron.ipcRenderer.send('runScript', 'dotnetmwoe', ['ziegler'])}>
          <span slot="text">CLI args</span>
        </Button>
       
      </div>
      <div ref={terminalContainer} className="terminalContainer"></div>
    </div>
  )
}
