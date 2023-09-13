import { useState } from "react"
import Conditional from "@components/Conditional"
import Button from "@components/Button"
import Icon from "@components/Icon"

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

  const icon = <Icon icon="coffee" spin={isScriptRunning} />

  return (
    
    <div className="container">
      <Conditional>
        {/* If script is not running, render the button. Else, render the p tag */ }
        <Button onClick={executeScript} iconPosition="right" icon={icon} text="Hi mom"/>
        
        {/* <p slot="else" className="text-lg text-center">Please wait, script is running...</p> */}

      </Conditional>
    </div>
  )
}

export default App
