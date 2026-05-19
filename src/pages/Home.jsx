import { useNavigate } from 'react-router-dom'
import { usePlants } from '../context/PlantContext'
import BottomNav from '../components/BottomNav'
import HumidityBar from '../components/HumidityBar'
import StatusBadge from '../components/StatusBadge'

export default function Home() {
  const navigate = useNavigate()
  const { plants, user, unreadCount, getStatus } = usePlants()

  const needsWater  = plants.filter(p => getStatus(p) !== 'ok').length
  const wellHydrated = plants.filter(p => getStatus(p) === 'ok').length

  return (
    <div className="min-h-dvh bg-plant-bg flex flex-col pb-24">

      {/* Header */}
      <div className="bg-white shadow-card px-5 pt-12 pb-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-plant-mid">¡Buenos días! 🌞</p>
            <h1 className="text-2xl font-black text-plant-dark">{user.name}</h1>
          </div>
          <button
            onClick={() => navigate('/notifications')}
            className="relative w-11 h-11 rounded-full bg-plant-light flex items-center justify-center active:scale-90 transition-transform"
          >
            <span className="text-xl">🔔</span>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-400 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 flex flex-col gap-4">

        {/* Resumen de sensores */}
        <div className="bg-plant-primary rounded-3xl p-4 shadow-btn flex justify-around text-white">
          {[
            { val: plants.length, lbl: 'Plantas' },
            { val: needsWater,    lbl: 'Necesitan riego' },
            { val: wellHydrated,  lbl: 'Bien hidratadas' },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="flex flex-col items-center">
              <span className="text-2xl font-black">{val}</span>
              <span className="text-[11px] opacity-80 text-center leading-tight mt-0.5">{lbl}</span>
            </div>
          ))}
        </div>

        {/* Sección plantas */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-plant-dark">Mis Plantas</h2>
          <button
            onClick={() => navigate('/add-plant')}
            className="px-3 py-1.5 bg-plant-primary rounded-xl text-white text-xs font-bold shadow-btn active:scale-90 transition-transform"
          >
            + Agregar
          </button>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-2 gap-3">
          {plants.map(plant => {
            const status = getStatus(plant)
            return (
              <button
                key={plant.id}
                onClick={() => navigate(`/plant/${plant.id}`)}
                className="bg-white rounded-3xl shadow-card overflow-hidden text-left active:scale-95 transition-transform"
              >
                {/* Ilustración */}
                <div
                  className="w-full h-20 flex items-center justify-center relative"
                  style={{ backgroundColor: plant.color }}
                >
                  <span className="text-4xl">{plant.emoji}</span>
                  <div className="absolute top-2 right-2">
                    <StatusBadge status={status} />
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-1.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-black text-plant-dark text-sm leading-tight">{plant.nickname}</p>
                      <p className="text-[10px] text-plant-muted leading-tight">{plant.name}</p>
                    </div>
                    <span className="text-[10px] text-plant-muted mt-0.5">···</span>
                  </div>

                  <HumidityBar humidity={plant.humidity} minHumidity={plant.minHumidity} />

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-plant-mid">💧 {plant.humidity}%</span>
                    <span className={`text-[10px] font-bold ${status === 'ok' ? 'text-green-600' : status === 'warning' ? 'text-yellow-600' : 'text-red-500'}`}>
                      {plant.location}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {plants.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-3">
            <span className="text-6xl">🪴</span>
            <p className="text-plant-mid text-center font-semibold">¡Aún no tienes plantas!</p>
            <button
              onClick={() => navigate('/add-plant')}
              className="px-6 py-3 bg-plant-primary rounded-2xl text-white font-bold shadow-btn"
            >
              Agregar mi primera planta
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
