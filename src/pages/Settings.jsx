import { useNavigate } from 'react-router-dom'
import { usePlants } from '../context/PlantContext'
import BottomNav from '../components/BottomNav'

export default function Settings() {
  const navigate = useNavigate()
  const { user, plants } = usePlants()

  const items = [
    { icon: '👤', label: 'Mi perfil',          sub: user.email },
    { icon: '📡', label: 'Sensores conectados', sub: `${plants.length} activos` },
    { icon: '🔔', label: 'Notificaciones',      sub: 'Alertas activadas' },
    { icon: '🌿', label: 'Todas mis plantas',   sub: `${plants.length} plantas`, action: () => navigate('/home') },
    { icon: '🌡️', label: 'Unidades',            sub: 'Celsius · Humedad %' },
    { icon: '🔒', label: 'Privacidad',          sub: 'Datos locales' },
    { icon: '🌐', label: 'Idioma',              sub: 'Español' },
    { icon: '❓', label: 'Ayuda',              sub: 'PlantSense v1.0' },
  ]

  return (
    <div className="min-h-dvh bg-plant-bg flex flex-col pb-24">
      <div className="bg-white shadow-card px-5 pt-12 pb-4">
        <h1 className="text-2xl font-black text-plant-dark">Configuración ⚙️</h1>
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">

        {/* Avatar */}
        <div className="bg-white rounded-3xl shadow-card p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-plant-light flex items-center justify-center text-3xl flex-shrink-0">
            🧑‍🌾
          </div>
          <div>
            <p className="font-black text-plant-dark text-lg">{user.name}</p>
            <p className="text-sm text-plant-mid">{user.email}</p>
            <span className="text-xs bg-plant-mint text-plant-dark font-bold px-2 py-0.5 rounded-full mt-1 inline-block">
              🌱 Jardinera activa
            </span>
          </div>
        </div>

        {/* Lista de opciones */}
        <div className="bg-white rounded-3xl shadow-card divide-y divide-plant-bg overflow-hidden">
          {items.map(item => (
            <button
              key={item.label}
              onClick={item.action}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-plant-bg transition-colors"
            >
              <span className="text-xl w-7 flex-shrink-0">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-plant-dark">{item.label}</p>
                <p className="text-xs text-plant-muted">{item.sub}</p>
              </div>
              <span className="text-plant-muted text-lg">›</span>
            </button>
          ))}
        </div>

        {/* Cerrar sesión */}
        <button
          onClick={() => navigate('/')}
          className="w-full py-4 rounded-2xl border-2 border-red-200 bg-red-50 font-bold text-red-500 text-base active:scale-95 transition-transform"
        >
          🚪 Cerrar sesión
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
