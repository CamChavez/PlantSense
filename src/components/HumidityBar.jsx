export default function HumidityBar({ humidity, minHumidity, size = 'md' }) {
  const pct = Math.min(100, Math.max(0, humidity))
  const isUrgent  = humidity < minHumidity * 0.6
  const isWarning = humidity < minHumidity

  const barColor = isUrgent ? '#F8A0A0' : isWarning ? '#FFE281' : '#9ECC99'

  const heights = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' }

  return (
    <div className={`w-full bg-plant-light rounded-full ${heights[size]} overflow-hidden`}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, backgroundColor: barColor }}
      />
    </div>
  )
}
