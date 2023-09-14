import { useState } from "react"
import Conditional from "@components/Conditional"
import Button from "@components/Button"
import Icon from "@components/Icon"
import Switch from "./components/Switch"

// Some code for testing the Conditional component

function App(): JSX.Element {
  const [isScriptRunning, setIsScriptRunning] = useState(false)

  const executeScript = () => {

    // Run the Script
    window.ipcRenderer.send('runScript')
    
    // set scriptRunning variable to true
    setIsScriptRunning(true)

    // reset it to false after 3 seconds
    setTimeout(() => {
      setIsScriptRunning(false)
    }, 3000)
  }

  const icon = <Icon icon="gears" />

  return (
    
    <div className="container">
      
      <Switch className="mt-4 ml-4" checked={true} icon={icon} />
    </div>
  )
}

export default App
