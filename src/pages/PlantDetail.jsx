import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePlants } from '../context/PlantContext'
import HumidityBar from '../components/HumidityBar'
import StatusBadge from '../components/StatusBadge'
import BottomNav from '../components/BottomNav'

export default function PlantDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { plants, deletePlant, waterPlant, getStatus } = usePlants()
  const [showDelete, setShowDelete] = useState(false)
  const [watered, setWatered] = useState(false)

  const plant = plants.find(p => p.id === Number(id))
  if (!plant) return (
    <div className="min-h-dvh bg-plant-bg flex items-center justify-center">
      <div className="text-center">
        <span className="text-6xl">🍃</span>
        <p className="text-plant-mid mt-3 font-semibold">Planta no encontrada</p>
        <button onClick={() => navigate('/home')} className="mt-4 px-5 py-2.5 bg-plant-primary rounded-xl text-white font-bold">
          Volver al inicio
        </button>
      </div>
    </div>
  )

  const status = getStatus(plant)

  const handleWater = () => {
    waterPlant(plant.id)
    setWatered(true)
    setTimeout(() => setWatered(false), 2500)
  }

  const handleDelete = () => {
    deletePlant(plant.id)
    navigate('/home')
  }

  const maxHistory = Math.max(...(plant.history?.map(h => h.humidity) || [100]))

  return (
    <div className="min-h-dvh bg-plant-bg flex flex-col pb-24">

      {/* Header con ilustración */}
      <div
        className="relative w-full pt-12 pb-6 flex flex-col items-center"
        style={{ backgroundColor: plant.color }}
      >
        <div className="flex items-center justify-between w-full px-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white/60 backdrop-blur flex items-center justify-center active:scale-90 transition-transform"
          >
            <span className="text-plant-dark font-bold text-lg">‹</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/edit-plant/${plant.id}`)}
              className="px-3 py-1.5 rounded-xl bg-white/60 backdrop-blur text-plant-dark text-xs font-bold active:scale-90 transition-transform"
            >
              ✏️ Editar
            </button>
            <button
              onClick={() => setShowDelete(true)}
              className="px-3 py-1.5 rounded-xl bg-white/60 backdrop-blur text-red-500 text-xs font-bold active:scale-90 transition-transform"
            >
              🗑️
            </button>
          </div>
        </div>
        <span className="text-8xl drop-shadow-md">{plant.emoji}</span>
      </div>

      <div className="px-4 -mt-5 flex flex-col gap-4">

        {/* Nombre y estado */}
        <div className="bg-white rounded-3xl shadow-card p-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black text-plant-dark">{plant.nickname}</h1>
            <p className="text-sm text-plant-muted italic">{plant.name}</p>
            <p className="text-xs text-plant-mid mt-1">📍 {plant.location} · 📡 {plant.sensorId}</p>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Humedad actual */}
        <div className="bg-white rounded-3xl shadow-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-black text-plant-dark">Humedad del sensor</h2>
            <span className={`text-lg font-black ${status === 'ok' ? 'text-green-600' : status === 'warning' ? 'text-yellow-600' : 'text-red-500'}`}>
              {plant.humidity}%
            </span>
          </div>
          <HumidityBar humidity={plant.humidity} minHumidity={plant.minHumidity} size="lg" />
          <div className="flex justify-between mt-2">
            <span className="text-[11px] text-plant-muted">Mínimo recomendado: {plant.minHumidity}%</span>
            <span className="text-[11px] text-plant-muted">Último riego: {plant.lastWatered}</span>
          </div>
        </div>

        {/* Historial */}
        {plant.history && plant.history.length > 0 && (
          <div className="bg-white rounded-3xl shadow-card p-4">
            <h2 className="font-black text-plant-dark mb-3">Historial de humedad</h2>
            <div className="flex items-end gap-1.5 h-20">
              {plant.history.slice(-7).map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${(h.humidity / maxHistory) * 64}px`,
                      backgroundColor: h.humidity < plant.minHumidity ? '#F8A0A0' : '#9ECC99',
                    }}
                  />
                  <span className="text-[8px] text-plant-muted">{h.date.slice(5)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info de cuidado */}
        <div className="bg-white rounded-3xl shadow-card p-4">
          <h2 className="font-black text-plant-dark mb-3">Cuidados</h2>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-plant-bg rounded-2xl p-3 text-center">
              <span className="text-2xl">💧</span>
              <p className="text-xs font-bold text-plant-dark mt-1">Riego</p>
              <p className="text-xs text-plant-mid">Cada {plant.wateringDays} días</p>
            </div>
            <div className="bg-plant-bg rounded-2xl p-3 text-center">
              <span className="text-2xl">📡</span>
              <p className="text-xs font-bold text-plant-dark mt-1">Sensor</p>
              <p className="text-xs text-plant-mid">{plant.sensorId}</p>
            </div>
          </div>
          {plant.notes && (
            <div className="bg-plant-mint/40 rounded-2xl p-3">
              <p className="text-xs text-plant-dark leading-relaxed">📝 {plant.notes}</p>
            </div>
          )}
        </div>

        {/* Botón regar */}
        <button
          onClick={handleWater}
          disabled={watered}
          className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-btn active:scale-95 transition-all disabled:opacity-70"
          style={{ backgroundColor: watered ? '#9ECC99' : '#6AAD64' }}
        >
          {watered ? '✅ ¡Regada!' : '💧 Registrar Riego'}
        </button>
      </div>

      {/* Modal eliminar */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-[430px] rounded-t-3xl p-6 pb-10">
            <div className="flex justify-center mb-4">
              <span className="text-5xl">🗑️</span>
            </div>
            <h3 className="text-lg font-black text-plant-dark text-center">¿Eliminar {plant.nickname}?</h3>
            <p className="text-sm text-plant-mid text-center mt-2 mb-6">
              Esta acción no se puede deshacer. Se eliminarán todos los datos del sensor.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 py-3.5 rounded-2xl border-2 border-plant-light font-bold text-plant-dark"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3.5 rounded-2xl bg-red-400 font-bold text-white shadow-btn"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
