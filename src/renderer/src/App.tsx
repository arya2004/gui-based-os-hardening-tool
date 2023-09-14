import { useState } from "react"
import Conditional from "@components/Conditional"
import Button from "@components/Button"
import Icon from "@components/Icon"
import Switch from "./components/Switch"
import Alert from "./components/Alert"

// Some code for testing the Conditional component

function App(): JSX.Element {
  const [isScriptRunning, setIsScriptRunning] = useState(false)

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
        <Button slot="button" className="text-sm" iconPosition="left">
          <Icon slot="icon" icon="gears" fontSize={16} />
          <span slot="text" className="text-xl">Cancel</span>
        </Button>
    </>
  )
}

export default App
