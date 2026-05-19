import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => navigate('/home'), 1000)
  }

  return (
    <div className="min-h-dvh bg-plant-bg flex flex-col overflow-hidden relative">

      {/* Blobs decorativos */}
      <div className="absolute -top-20 -left-10 w-80 h-72 rounded-full bg-plant-light opacity-60" />
      <div className="absolute -top-10 right-0 w-48 h-48 rounded-full bg-plant-mint opacity-50" />
      <div className="absolute top-52 -right-16 w-36 h-36 rounded-full bg-plant-lavender opacity-40" />

      <div className="relative z-10 flex flex-col items-center px-6 pt-16">

        {/* Logo */}
        <div className="w-24 h-24 rounded-full bg-white shadow-card flex items-center justify-center mb-4">
          <span className="text-5xl">🪴</span>
        </div>

        <h1 className="text-4xl font-black text-plant-dark tracking-tight">PlantSense</h1>
        <p className="text-plant-mid mt-1 text-base">Cuida tus plantas con amor 🌱</p>

        {/* Formulario */}
        <div className="w-full mt-10">
          <h2 className="text-2xl font-bold text-plant-dark mb-6">¡Bienvenida de vuelta!</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-plant-mid">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="hola@plantsense.com"
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-plant-light bg-white text-plant-dark placeholder-plant-muted text-base outline-none focus:border-plant-primary transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-plant-mid">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-plant-light bg-white text-plant-dark placeholder-plant-muted text-base outline-none focus:border-plant-primary transition-colors"
              />
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-sm font-semibold text-plant-primary">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-plant-primary font-bold text-white text-lg shadow-btn active:scale-95 transition-transform disabled:opacity-70 mt-2"
            >
              {loading ? '...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Divisor */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-plant-light" />
            <span className="text-plant-muted text-sm">o</span>
            <div className="flex-1 h-px bg-plant-light" />
          </div>

          {/* Google button */}
          <button
            onClick={() => navigate('/home')}
            className="w-full py-3.5 rounded-2xl bg-white border-2 border-plant-light font-semibold text-plant-dark text-base flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <span className="text-xl">🌐</span> Continuar con Google
          </button>

          <p className="text-center mt-6 text-plant-mid text-sm">
            ¿No tienes cuenta?{' '}
            <button onClick={() => navigate('/home')} className="font-bold text-plant-dark underline-offset-2 hover:underline">
              Regístrate
            </button>
          </p>
        </div>
      </div>

      {/* Dots decorativos abajo */}
      <div className="absolute bottom-16 left-8 w-3 h-3 rounded-full bg-plant-peach" />
      <div className="absolute bottom-10 left-16 w-4 h-4 rounded-full bg-plant-lavender opacity-70" />
      <div className="absolute bottom-14 right-8 w-3 h-3 rounded-full bg-plant-mint" />
    </div>
  )
}
