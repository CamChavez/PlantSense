import { createContext, useContext, useState } from 'react'
import { INITIAL_PLANTS, INITIAL_NOTIFICATIONS } from '../data/plants'

const PlantContext = createContext(null)

export function PlantProvider({ children }) {
  const [plants, setPlants] = useState(INITIAL_PLANTS)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [user] = useState({ name: 'Camila', email: 'camila@plantsense.com' })

  const addPlant = (plantData) => {
    const newPlant = {
      ...plantData,
      id: Date.now(),
      humidity: Math.floor(Math.random() * 40) + 40,
      lastWatered: new Date().toISOString().split('T')[0],
      sensorId: `SNS-${String(plants.length + 1).padStart(3, '0')}`,
      history: [],
    }
    setPlants(prev => [...prev, newPlant])

    const newNotif = {
      id: Date.now(),
      plantId: newPlant.id,
      plantName: newPlant.nickname,
      emoji: newPlant.emoji,
      type: 'success',
      message: `¡${newPlant.nickname} fue agregada exitosamente! 🎉`,
      time: 'Ahora',
      read: false,
    }
    setNotifications(prev => [newNotif, ...prev])
  }

  const updatePlant = (id, data) => {
    setPlants(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
  }

  const deletePlant = (id) => {
    setPlants(prev => prev.filter(p => p.id !== id))
  }

  const waterPlant = (id) => {
    const today = new Date().toISOString().split('T')[0]
    setPlants(prev => prev.map(p => {
      if (p.id !== id) return p
      const newHumidity = Math.min(95, p.minHumidity + Math.floor(Math.random() * 30) + 20)
      return {
        ...p,
        lastWatered: today,
        humidity: newHumidity,
        history: [...(p.history || []), { date: today, humidity: newHumidity }],
      }
    }))
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const getStatus = (plant) => {
    if (plant.humidity < plant.minHumidity * 0.6) return 'urgent'
    if (plant.humidity < plant.minHumidity) return 'warning'
    return 'ok'
  }

  return (
    <PlantContext.Provider value={{
      plants, notifications, user,
      addPlant, updatePlant, deletePlant, waterPlant,
      markAllRead, unreadCount, getStatus,
    }}>
      {children}
    </PlantContext.Provider>
  )
}

export const usePlants = () => useContext(PlantContext)
