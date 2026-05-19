export default function StatusBadge({ status }) {
  const map = {
    ok:      { label: 'Bien 💚',    bg: 'bg-green-100',  text: 'text-green-700' },
    warning: { label: 'Seca ⚠️',    bg: 'bg-yellow-100', text: 'text-yellow-700' },
    urgent:  { label: '¡Riego! 💧', bg: 'bg-red-100',    text: 'text-red-600' },
  }
  const { label, bg, text } = map[status] || map.ok
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${bg} ${text}`}>
      {label}
    </span>
  )
}
