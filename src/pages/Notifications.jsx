import { useNavigate } from 'react-router-dom'
import { usePlants } from '../context/PlantContext'
import BottomNav from '../components/BottomNav'

const TYPE_STYLE = {
  urgent:  { bg: 'bg-red-50',    border: 'border-red-200',    icon: '🚨', dot: 'bg-red-400' },
  warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: '⚠️',  dot: 'bg-yellow-400' },
  success: { bg: 'bg-green-50',  border: 'border-green-200',  icon: '✅',  dot: 'bg-green-400' },
  info:    { bg: 'bg-blue-50',   border: 'border-blue-200',   icon: 'ℹ️',  dot: 'bg-blue-300' },
}

export default function Notifications() {
  const navigate = useNavigate()
  const { notifications, markAllRead, unreadCount } = usePlants()

  return (
    <div className="min-h-dvh bg-plant-bg flex flex-col pb-24">

      {/* Header */}
      <div className="bg-white shadow-card px-5 pt-12 pb-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-plant-light flex items-center justify-center active:scale-90 transition-transform">
              <span className="text-plant-dark font-bold text-lg">‹</span>
            </button>
            <h1 className="text-xl font-black text-plant-dark">Notificaciones</h1>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs font-bold text-plant-primary">
              Marcar todo leído
            </button>
          )}
        </div>
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">

        {unreadCount > 0 && (
          <div className="bg-plant-mint rounded-2xl px-4 py-3 flex items-center gap-2">
            <span className="text-lg">🔔</span>
            <p className="text-sm font-semibold text-plant-dark">
              Tienes <span className="font-black">{unreadCount}</span> alertas sin leer
            </p>
          </div>
        )}

        {notifications.length === 0 && (
          <div className="flex flex-col items-center py-20 gap-3">
            <span className="text-6xl">🎉</span>
            <p className="text-plant-mid font-semibold text-center">¡Todo al día!<br />Sin notificaciones pendientes.</p>
          </div>
        )}

        {notifications.map(notif => {
          const style = TYPE_STYLE[notif.type] || TYPE_STYLE.info
          return (
            <div
              key={notif.id}
              className={`rounded-2xl border p-4 flex gap-3 items-start transition-opacity ${style.bg} ${style.border} ${notif.read ? 'opacity-60' : ''}`}
            >
              {/* Dot sin leer */}
              {!notif.read && (
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${style.dot}`} />
              )}
              {notif.read && <div className="w-2 flex-shrink-0" />}

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{notif.emoji}</span>
                  <span className="font-black text-plant-dark text-sm">{notif.plantName}</span>
                  <span className="ml-auto text-[10px] text-plant-muted">{notif.time}</span>
                </div>
                <p className="text-sm text-plant-dark leading-snug">{notif.message}</p>
                {notif.type === 'urgent' || notif.type === 'warning' ? (
                  <button
                    onClick={() => navigate(`/plant/${notif.plantId}`)}
                    className="mt-2 text-xs font-bold text-plant-primary"
                  >
                    Ver planta →
                  </button>
                ) : null}
              </div>

              <span className="text-lg flex-shrink-0">{style.icon}</span>
            </div>
          )
        })}
      </div>

      <BottomNav />
    </div>
  )
}
