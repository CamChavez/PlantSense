# 🪴 PlantSense — App de Cuidado de Plantas con Sensores

> Proyecto final · Habilidades Directivas · Camila Chávez Ramírez

PlantSense es una aplicación web mobile-first que simula el monitoreo de plantas mediante sensores de humedad. Permite visualizar el estado de cada planta en tiempo real, recibir notificaciones de riego y gestionar toda tu colección verde desde una interfaz bonita, pastel y biológica. 🌱

---

## ✨ Funcionalidades

| Pantalla | Descripción |
|---|---|
| 🔐 **Login** | Inicio de sesión con email/contraseña o Google |
| 🏠 **Home** | Dashboard con tarjetas de plantas, resumen de sensores y estados de humedad |
| 🔔 **Notificaciones** | Alertas de riego urgente, advertencias y confirmaciones de sensor |
| 🌿 **Detalle de Planta** | Info completa del sensor, historial de humedad, botón de riego y notas |
| ➕ **Agregar Planta** | Formulario con tipo, apodo, nombre científico, parámetros del sensor y color |
| ✏️ **Editar Planta** | Modificar todos los datos de una planta existente |
| 🗑️ **Eliminar Planta** | Modal de confirmación antes de borrar |
| ⚙️ **Configuración** | Perfil de usuario, sensores conectados y cierre de sesión |

---

## 🎨 Diseño

- **Paleta pastel biológica**: verdes suaves, menta, lavanda, durazno y amarillo paja
- **Tipografía**: Nunito — redondeada, amigable y legible
- **Mobile-first**: optimizado para 390–430 px (iPhone / Android)
- **Estilo**: bordes redondeados, sombras suaves, colores diferenciados por planta

### Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| `plant-bg` | `#EFF7EA` | Fondo general |
| `plant-primary` | `#9ECC99` | Botones y acentos activos |
| `plant-dark` | `#495D3D` | Texto principal |
| `plant-light` | `#C7E7C4` | Chips y nav activo |
| `plant-mint` | `#C9EDD6` | Tarjetas tropicales |
| `plant-pink` | `#FCD5DC` | Tarjetas en alerta |
| `plant-yellow` | `#FFE281` | Advertencias de humedad baja |
| `plant-lavender` | `#D7C7E9` | Tarjetas de flores |
| `plant-blue` | `#B6DAE9` | Tarjetas de hierbas |

---

## 🛠️ Tecnologías

- **React 19** — biblioteca de UI
- **React Router v7** — navegación entre pantallas
- **Tailwind CSS v3** — estilos utilitarios con tema personalizado
- **Vite 5** — bundler y servidor de desarrollo
- **Context API** — estado global (plantas, notificaciones, usuario)

> No requiere backend. Los datos son locales en memoria (simulación de sensores IoT).

---

## 🚀 Instalación y uso

### Requisitos previos

- Node.js **20.x** o superior
- npm 9+

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/plantsense.git
cd plantsense

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

> 💡 Para verlo como app móvil: abre DevTools (F12) → ícono de dispositivo móvil → iPhone 14 (390 × 844 px)

### Otros comandos

```bash
npm run build    # Compila para producción → genera /dist
npm run preview  # Previsualiza el build de producción
```

---

## 📁 Estructura del proyecto

```
plantsense/
├── public/
├── src/
│   ├── components/
│   │   ├── BottomNav.jsx      # Barra de navegación inferior con badge de alertas
│   │   ├── HumidityBar.jsx    # Barra de progreso de humedad con colores dinámicos
│   │   └── StatusBadge.jsx    # Chip de estado: Bien / Seca / ¡Riego!
│   ├── context/
│   │   └── PlantContext.jsx   # Estado global: plantas, notificaciones, acciones
│   ├── data/
│   │   └── plants.js          # Datos iniciales + tipos de plantas + notificaciones
│   ├── pages/
│   │   ├── Login.jsx          # Inicio de sesión
│   │   ├── Home.jsx           # Dashboard con grid de tarjetas
│   │   ├── Notifications.jsx  # Centro de alertas del sensor
│   │   ├── PlantDetail.jsx    # Detalle, historial, riego y eliminar
│   │   ├── AddPlant.jsx       # Formulario para agregar planta
│   │   ├── EditPlant.jsx      # Formulario para editar planta
│   │   └── Settings.jsx       # Configuración y perfil de usuario
│   ├── App.jsx                # Definición de rutas
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos globales + directivas Tailwind
├── tailwind.config.js         # Colores y tema personalizado
├── vite.config.js
└── package.json
```

---

## 📡 Simulación de sensores

Los sensores están simulados con datos estáticos en `src/data/plants.js`. Cada planta incluye:

```js
{
  id: 1,
  name: 'Monstera Deliciosa',
  nickname: 'Monsi',
  humidity: 72,          // Lectura actual del sensor (%)
  minHumidity: 50,       // Umbral mínimo de alerta
  wateringDays: 3,       // Frecuencia de riego (días)
  sensorId: 'SNS-001',   // ID del sensor IoT
  history: [             // Historial de lecturas
    { date: '2026-05-08', humidity: 72 },
    ...
  ]
}
```

**Lógica de alertas:**

```
humidity < minHumidity × 0.6  →  🚨 Urgente   → badge rojo
humidity < minHumidity         →  ⚠️ Advertencia → badge amarillo
humidity ≥ minHumidity         →  ✅ Bien        → badge verde
```

---

## 🗺️ Rutas de navegación

```
/                →  Login
/home            →  Home Dashboard
/plant/:id       →  Detalle de Planta
/add-plant       →  Agregar Planta
/edit-plant/:id  →  Editar Planta
/notifications   →  Centro de Notificaciones
/settings        →  Configuración
```

---

## 🔮 Posibles mejoras futuras

- [ ] Integración real con sensores Arduino / ESP32 vía MQTT o WebSocket
- [ ] Backend con Node.js + MongoDB para persistencia de datos
- [ ] Autenticación real con Firebase Auth
- [ ] Notificaciones push con Service Workers (PWA)
- [ ] Gráfica de humedad con Chart.js o Recharts
- [ ] Modo oscuro
- [ ] Exportar reporte de salud de plantas en PDF

---

## 🎓 Contexto académico

Este proyecto fue desarrollado como trabajo final para la materia **Habilidades Directivas**. El objetivo fue aplicar metodologías de diseño centrado en el usuario (UX), prototipado en Figma y desarrollo frontend con tecnologías modernas.

**Flujo de trabajo utilizado:**
1. Definición de requerimientos y flujos de usuario
2. Diseño del prototipo en Figma (paleta pastel + componentes)
3. Implementación con React + Tailwind CSS
4. Pruebas funcionales en navegador

---