import { useNavigate, useLocation } from 'react-router-dom'
import { usePlants } from '../context/PlantContext'

const NAV_ITEMS = [
  { path: '/home',           emoji: '🏠', label: 'Inicio' },
  { path: '/plants',         emoji: '🌱', label: 'Plantas' },
  { path: '/notifications',  emoji: '🔔', label: 'Alertas' },
  { path: '/settings',       emoji: '⚙️',  label: 'Config' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { unreadCount } = usePlants()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white shadow-nav z-50 px-2 pb-2 pt-1">
      <div className="flex justify-around items-center">
        {NAV_ITEMS.map(item => {
          const active = pathname === item.path || (item.path === '/plants' && pathname.startsWith('/plant'))
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-0.5 py-1 px-4 rounded-2xl transition-all active:scale-90"
            >
              <div className={`relative flex items-center justify-center w-12 h-9 rounded-2xl transition-colors ${active ? 'bg-plant-light' : ''}`}>
                <span className="text-xl leading-none">{item.emoji}</span>
                {item.path === '/notifications' && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-semibold ${active ? 'text-plant-dark' : 'text-plant-muted'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
