import useAlertsStore from '@renderer/store/alerts'
interface AlertContainerProps {
  alerts: JSX.Element[]
}

export default function AlertContainer(props: AlertContainerProps): JSX.Element {
  // let [alerts, setAlerts] = useAtom(alertsAtom)
  let { alerts } = useAlertsStore()

  return (
    <>
      {alerts.toReversed().map((alert, index) => {
        let Alert = () => alert
        return <Alert key={index} />
      })}
    </>
  )
}
