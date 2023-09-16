import Button from '@renderer/components/Button'
import useTerminal from '@renderer/store/logs'
import { useEffect, useRef } from 'react'
import Switch from '@renderer/components/Switch'

export default function Firewall(): JSX.Element {
  let term = useTerminal()
  let terminalContainer = useRef(null)
  useEffect(() => {
    term.createTerminal()
    if (terminalContainer.current) term.setupTerminal(terminalContainer.current)
    return () => term.disposeTerminal()
  }, [])

  const runFirewallScript = (_, status) => {
    if(status)window.electron.ipcRenderer.send('runScript', { name: 'ufw', mode:0, args:["ARRAHFJKA"] })
    else window.electron.ipcRenderer.send('runScript', { name: 'ufw', mode:1 ,args:["Vishal"] })
  }

  return (
    <div className="firewall">

      <div className="mt-4">
        <div className="flex items-center">
          <span className="mr-4">Enable/Disable firewall</span>
          <Switch onClick={runFirewallScript}></Switch>
        </div>
        <Button
          className="my-4"
          onClick={() =>
            window.electron.ipcRenderer.send('runScript', { name: 'ufw', mode:2 })
          }
        >
          <span slot="text">Firewall Status</span>
        </Button>
      </div>
      <div ref={terminalContainer} className="terminalContainer w-[90%]"></div>
    </div>
  )
}
