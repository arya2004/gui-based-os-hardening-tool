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
      <center>this is fireall pahge</center>
      <div className="flex">
        <p style={{marginInlineEnd:'2rem'}}>Enable Disable firewall</p>
        <Switch onClick={runFirewallScript} style={{ marginInlineEnd: '10rem' }}></Switch>
        <Button onClick={() => window.electron.ipcRenderer.send('runScript',  { name: 'ufw',mode:2 })}>
          <span slot="text">ufwStatus</span>
        </Button>
      </div>
      <div ref={terminalContainer} className="terminalContainer"></div>
    </div>
  )
}
