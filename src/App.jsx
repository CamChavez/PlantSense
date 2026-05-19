import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PlantProvider } from './context/PlantContext'
import Login         from './pages/Login'
import Home          from './pages/Home'
import Notifications from './pages/Notifications'
import PlantDetail   from './pages/PlantDetail'
import AddPlant      from './pages/AddPlant'
import EditPlant     from './pages/EditPlant'
import Settings      from './pages/Settings'

export default function App() {
  return (
    <PlantProvider>
      <BrowserRouter>
        <div className="phone-shell">
          <Routes>
            <Route path="/"                 element={<Login />} />
            <Route path="/home"             element={<Home />} />
            <Route path="/plants"           element={<Home />} />
            <Route path="/notifications"    element={<Notifications />} />
            <Route path="/plant/:id"        element={<PlantDetail />} />
            <Route path="/add-plant"        element={<AddPlant />} />
            <Route path="/edit-plant/:id"   element={<EditPlant />} />
            <Route path="/settings"         element={<Settings />} />
            <Route path="*"                 element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </PlantProvider>
  )
}
