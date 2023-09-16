import Sidebar from '@renderer/components/Sidebar'

export default function PageWrapper({ children }): JSX.Element {
  return (
    <>
      <Sidebar />
      <div className="absolute top-0 right-0 w-4/5">
        <div className="relative">{children}</div>
      </div>
    </>
  )
}
