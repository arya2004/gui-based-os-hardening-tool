import { useState } from "react"
import Conditional from "@components/Conditional"
import Button from "@components/Button"
import Icon from "@components/Icon"
import Switch from "./components/Switch"
import Alert from "./components/Alert"
import AlertContainer from './components/AlertContainer'
import useAlertsStore from './store/alerts'

// Some code for testing the Conditional component

function App(): JSX.Element {
  const [isScriptRunning, setIsScriptRunning] = useState(false)

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

  let alert = (
    <Alert>
      <Button slot="button" iconPosition="left" className="bg-transparent">
        <Icon slot="icon" icon="gears" fontSize={16} />
      </Button>
      <p slot="text">Heheboi</p>
    </Alert>
  )
  return (
    <>
      <Button onClick={() => queueAlert(alert)}>
        <p slot="text">Add atom</p>
      </Button>
      <AlertContainer alerts={[]} />
    </>
  )
}

export default App
