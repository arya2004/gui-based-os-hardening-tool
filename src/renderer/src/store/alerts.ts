import { create } from 'zustand'

type AlertsStore = {
  alerts: JSX.Element[]
  queueAlert: (alert: JSX.Element) => void
}

const useAlertsStore = create<AlertsStore>()((set) => ({
  alerts: [],
  queueAlert: (alert: JSX.Element) => {
    set((state) => ({
      alerts: [...state.alerts, alert]
    }))
  }
}))

export default useAlertsStore
