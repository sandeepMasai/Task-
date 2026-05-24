import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { FiMapPin, FiLayers, FiNavigation } from 'react-icons/fi'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const makePinIcon = () =>
  L.divIcon({
    className: '',
    iconAnchor: [20, 44],
    popupAnchor: [0, -44],
    html: `
      <div style="position:relative;width:40px;height:48px">
        <svg viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="48">
          <path d="M20 0C10.06 0 2 8.06 2 18c0 13.5 18 30 18 30s18-16.5 18-30C38 8.06 29.94 0 20 0z"
            fill="url(#pg)" stroke="white" stroke-width="1.5"/>
          <defs>
            <linearGradient id="pg" x1="0" y1="0" x2="40" y2="48" gradientUnits="userSpaceOnUse">
              <stop stop-color="#6366f1"/>
              <stop offset="1" stop-color="#8b5cf6"/>
            </linearGradient>
          </defs>
          <circle cx="20" cy="18" r="7" fill="white" fill-opacity="0.95"/>
          <circle cx="20" cy="18" r="3.5" fill="#6366f1"/>
        </svg>
        <div style="
          position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);
          background:rgba(99,102,241,0.92);color:white;
          font-size:9px;font-weight:700;padding:2px 7px;
          border-radius:20px;white-space:nowrap;
          box-shadow:0 2px 8px rgba(99,102,241,0.4);
          backdrop-filter:blur(4px);letter-spacing:0.03em;
        " id="pin-label"></div>
      </div>
    `,
  })

const LAYERS = {
  street: {
    label: 'Street',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://osm.org">OpenStreetMap</a>',
  },
  satellite: {
    label: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri &mdash; Source: Esri, Maxar, GeoEye',
  },
  terrain: {
    label: 'Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
  },
}

export default function MapView({ coords, name, state, height = 380 }) {
  const [activeLayer, setActiveLayer] = useState('street')
  if (!coords) return null

  const center = Array.isArray(coords) ? coords : [coords.lat, coords.lng]
  const lat = center[0].toFixed(4)
  const lng = center[1].toFixed(4)
  const layer = LAYERS[activeLayer]

  const pinIcon = makePinIcon()

  return (
    <div className="rounded-2xl overflow-hidden border border-white/30 dark:border-white/10 shadow-xl relative">

      <div className="flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b border-white/30 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 grid place-items-center text-white">
            <FiMapPin className="text-xs" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-white leading-none">
              Interactive GIS Map Pinboard
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              {name}{state ? `, ${state}` : ''} · India
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/10 rounded-lg p-1">
          <FiLayers className="text-slate-500 dark:text-slate-400 text-xs ml-1" />
          {Object.keys(LAYERS).map((key) => (
            <button
              key={key}
              onClick={() => setActiveLayer(key)}
              className={`px-2 py-1 rounded-md text-[10px] font-semibold transition capitalize ${
                activeLayer === key
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10'
              }`}
            >
              {LAYERS[key].label}
            </button>
          ))}
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom={false}
        zoomControl={true}
        style={{ height, width: '100%' }}
      >
        <TileLayer
          key={activeLayer}
          attribution={layer.attribution}
          url={layer.url}
        />
        <Marker position={center} icon={pinIcon}>
          <Popup>
            <div className="text-center py-1">
              <p className="font-bold text-slate-800">{name}</p>
              {state && <p className="text-xs text-slate-500">{state}, India</p>}
              <p className="text-[10px] text-indigo-500 mt-1 font-mono">
                {lat}°N, {lng}°E
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      <div className="absolute bottom-3 left-3 z-[999] flex items-center gap-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-2.5 py-1.5 rounded-xl shadow-lg border border-white/40 dark:border-white/10">
        <FiNavigation className="text-indigo-500 text-xs" />
        <span className="font-mono text-[10px] font-semibold text-slate-700 dark:text-slate-200">
          {lat}°N &nbsp;{lng}°E
        </span>
      </div>
    </div>
  )
}
