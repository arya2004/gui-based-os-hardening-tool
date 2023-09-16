import { Link } from 'react-router-dom'

export default function Sidebar(): JSX.Element {
  // array for sidebar options
  const sidebarOptions = [
    { name: 'Home', path: '/' },
    { name: 'Audit', path: '/audit' },
    { name: 'Firewall', path: '/firewall' }
  ]

  return (
    <aside className="w-1/5 p-2 h-screen absolute top-0 left-0 flex flex-col items-start justify-start">
      {sidebarOptions.map(({ name, path }, key) => (
        <Link
          key={key}
          className="sidebar-option z-50 p-2 my-1 rounded cursor-pointer hover:bg-[#eee]  transition-all duration-500 w-full"
          to={path}
        >
          {name}
        </Link>
      ))}
    </aside>
  )
}
