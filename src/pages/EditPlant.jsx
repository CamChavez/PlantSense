import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePlants } from '../context/PlantContext'
import { PLANT_TYPES } from '../data/plants'

const COLORS = [
  { label: 'Menta',    value: '#C9EDD6' },
  { label: 'Rosa',     value: '#FCD5DC' },
  { label: 'Amarillo', value: '#FFE281' },
  { label: 'Verde',    value: '#C7E7C4' },
  { label: 'Lavanda',  value: '#D7C7E9' },
  { label: 'Azul',     value: '#B6DAE9' },
]

function Field({ label, error, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="text-sm font-semibold text-plant-mid mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-2xl border-2 bg-plant-bg text-plant-dark placeholder-plant-muted text-sm outline-none focus:border-plant-primary transition-colors ${error ? 'border-red-300 bg-red-50' : 'border-transparent'}`}
      />
      {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  )
}

export default function EditPlant() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { plants, updatePlant } = usePlants()
  const plant = plants.find(p => p.id === Number(id))

  const [form, setForm] = useState(plant ? {
    nickname:    plant.nickname,
    name:        plant.name,
    type:        plant.type,
    emoji:       plant.emoji,
    location:    plant.location,
    wateringDays:plant.wateringDays,
    minHumidity: plant.minHumidity,
    notes:       plant.notes || '',
    color:       plant.color,
  } : {})
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  if (!plant) return (
    <div className="min-h-dvh bg-plant-bg flex items-center justify-center">
      <div className="text-center">
        <span className="text-6xl">🍃</span>
        <p className="text-plant-mid mt-3 font-semibold">Planta no encontrada</p>
        <button onClick={() => navigate('/home')} className="mt-4 px-5 py-2.5 bg-plant-primary rounded-xl text-white font-bold">
          Volver
        </button>
      </div>
    </div>
  )

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const validate = () => {
    const e = {}
    if (!form.nickname.trim()) e.nickname = 'El apodo es requerido'
    if (!form.name.trim())     e.name = 'El nombre es requerido'
    if (!form.location.trim()) e.location = 'La ubicación es requerida'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    updatePlant(plant.id, form)
    setSaved(true)
    setTimeout(() => navigate(`/plant/${plant.id}`), 800)
  }

  return (
    <div className="min-h-dvh bg-plant-bg flex flex-col pb-10">

      {/* Header */}
      <div className="bg-white shadow-card px-5 pt-12 pb-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-plant-light flex items-center justify-center active:scale-90 transition-transform">
            <span className="text-plant-dark font-bold text-lg">‹</span>
          </button>
          <h1 className="text-xl font-black text-plant-dark">Editar Planta</h1>
        </div>
      </div>

      {/* Preview */}
      <div
        className="flex flex-col items-center justify-center py-8 transition-colors duration-300"
        style={{ backgroundColor: form.color }}
      >
        <span className="text-7xl drop-shadow-md">{form.emoji}</span>
        <p className="font-black text-plant-dark text-lg mt-2">{form.nickname || 'Mi planta'}</p>
        <p className="text-sm text-plant-mid italic">{form.name}</p>
      </div>

      <form onSubmit={handleSubmit} className="px-4 pt-4 flex flex-col gap-4">

        {/* Tipo */}
        <div className="bg-white rounded-3xl shadow-card p-4">
          <label className="text-sm font-black text-plant-dark mb-3 block">Tipo de planta</label>
          <div className="grid grid-cols-4 gap-2">
            {PLANT_TYPES.map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => { set('type', type.id); set('emoji', type.emoji) }}
                className={`flex flex-col items-center py-2 px-1 rounded-2xl text-xs font-semibold transition-all active:scale-90 ${form.type === type.id ? 'bg-plant-light text-plant-dark ring-2 ring-plant-primary' : 'bg-plant-bg text-plant-mid'}`}
              >
                <span className="text-2xl mb-1">{type.emoji}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-3xl shadow-card p-4 flex flex-col gap-3">
          <h2 className="font-black text-plant-dark">Información</h2>
          <Field label="Apodo 🏷️" error={errors.nickname} value={form.nickname} onChange={v => set('nickname', v)} placeholder="ej. Monsi" />
          <Field label="Nombre científico 🔬" error={errors.name} value={form.name} onChange={v => set('name', v)} placeholder="ej. Monstera Deliciosa" />
          <Field label="Ubicación 📍" error={errors.location} value={form.location} onChange={v => set('location', v)} placeholder="ej. Sala" />
        </div>

        {/* Sensor */}
        <div className="bg-white rounded-3xl shadow-card p-4 flex flex-col gap-4">
          <h2 className="font-black text-plant-dark">Parámetros del sensor</h2>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-semibold text-plant-mid">Humedad mínima</label>
              <span className="text-sm font-bold text-plant-dark">{form.minHumidity}%</span>
            </div>
            <input type="range" min="10" max="80" value={form.minHumidity}
              onChange={e => set('minHumidity', Number(e.target.value))}
              className="w-full accent-plant-primary h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-semibold text-plant-mid">Frecuencia de riego</label>
              <span className="text-sm font-bold text-plant-dark">cada {form.wateringDays} días</span>
            </div>
            <input type="range" min="1" max="30" value={form.wateringDays}
              onChange={e => set('wateringDays', Number(e.target.value))}
              className="w-full accent-plant-primary h-2" />
          </div>
        </div>

        {/* Color */}
        <div className="bg-white rounded-3xl shadow-card p-4">
          <label className="text-sm font-black text-plant-dark mb-3 block">Color de tarjeta 🎨</label>
          <div className="flex gap-2 flex-wrap">
            {COLORS.map(c => (
              <button key={c.value} type="button" onClick={() => set('color', c.value)}
                className={`w-10 h-10 rounded-full transition-transform active:scale-90 ${form.color === c.value ? 'ring-2 ring-offset-2 ring-plant-dark scale-110' : ''}`}
                style={{ backgroundColor: c.value }} title={c.label} />
            ))}
          </div>
        </div>

        {/* Notas */}
        <div className="bg-white rounded-3xl shadow-card p-4">
          <label className="text-sm font-black text-plant-dark mb-2 block">Notas de cuidado 📝</label>
          <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
            placeholder="Consejos de riego, luz preferida, etc." rows={3}
            className="w-full px-3 py-2.5 rounded-2xl bg-plant-bg text-plant-dark text-sm placeholder-plant-muted outline-none resize-none" />
        </div>

        <button type="submit" disabled={saved}
          className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-btn active:scale-95 transition-all disabled:opacity-70"
          style={{ backgroundColor: saved ? '#9ECC99' : '#6AAD64' }}>
          {saved ? '✅ ¡Guardado!' : '💾 Guardar cambios'}
        </button>
      </form>
    </div>
  )
}
