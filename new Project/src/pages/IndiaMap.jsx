import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMapPin, FiLayers, FiStar, FiClock, FiX, FiNavigation, FiFilter } from 'react-icons/fi'
import places from '../data/places.js'
import { formatCurrency } from '../utils/format.js'


delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const CATEGORY_COLORS = {
  Historical:   '#f59e0b',
  Romantic:     '#ec4899',
  Adventure:    '#ef4444',
  'Hill Station': '#10b981',
  Beach:        '#06b6d4',
  Nature:       '#22c55e',
  Spiritual:    '#8b5cf6',
  Heritage:     '#f97316',
  Nightlife:    '#6366f1',
  Metropolitan: '#64748b',
}

const makePinIcon = (color = '#6366f1', active = false) =>
  L.divIcon({
    className: '',
    iconAnchor: [16, 38],
    popupAnchor: [0, -40],
    html: `
      <div style="position:relative;width:${active ? 38 : 30}px;height:${active ? 46 : 36}px;transition:all 0.2s">
        <svg viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg"
          width="${active ? 38 : 30}" height="${active ? 46 : 36}">
          <path d="M15 0C7.27 0 1 6.27 1 14c0 10.5 14 22 14 22s14-11.5 14-22C29 6.27 22.73 0 15 0z"
            fill="${color}" stroke="white" stroke-width="${active ? 2 : 1.5}"/>
          <circle cx="15" cy="14" r="5.5" fill="white" fill-opacity="0.95"/>
          <circle cx="15" cy="14" r="2.5" fill="${color}"/>
        </svg>
        ${active ? `<div style="
          position:absolute;top:-28px;left:50%;transform:translateX(-50%);
          background:${color};color:white;
          font-size:8px;font-weight:700;padding:2px 6px;
          border-radius:12px;white-space:nowrap;
          box-shadow:0 2px 8px rgba(0,0,0,0.25);
        ">📍 Selected</div>` : ''}
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
    attribution: '&copy; Esri',
  },
  terrain: {
    label: 'Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
  },
}

// India center
const INDIA_CENTER = [22.5, 80.5]

export default function IndiaMap() {
  const [activeLayer, setActiveLayer] = useState('street')
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [filterCat, setFilterCat] = useState('All')

  const categories = useMemo(() => {
    const cats = [...new Set(places.map((p) => p.category))]
    return ['All', ...cats]
  }, [])

  const filtered = useMemo(
    () => filterCat === 'All' ? places : places.filter((p) => p.category === filterCat),
    [filterCat]
  )

  const layer = LAYERS[activeLayer]

  return (
    <div className="px-4 md:px-8 mt-6 pb-10 space-y-6">

      {/* Page header */}
      <div className="glass rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm uppercase tracking-wider">
              BharatYatra GIS
            </p>
            <h1 className="heading-display text-3xl md:text-4xl font-extrabold mt-1">
              India Travel Map
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              {filtered.length} destinations pinned across India · click any pin to explore
            </p>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-semibold mr-1">
              <FiFilter className="text-brand-500" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  filterCat === cat
                    ? 'bg-gradient-to-r from-brand-500 to-indigo-600 text-white shadow-lg shadow-brand-500/30'
                    : 'bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map + sidebar */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Map */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-white/30 dark:border-white/10 shadow-xl">

          {/* Map toolbar */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b border-white/30 dark:border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-indigo-600 grid place-items-center text-white">
                <FiMapPin className="text-xs" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white leading-none">
                  Interactive GIS Map Pinboard
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Incredible India · {filtered.length} pins
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/10 rounded-lg p-1">
              <FiLayers className="text-slate-500 text-xs ml-1" />
              {Object.keys(LAYERS).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveLayer(key)}
                  className={`px-2 py-1 rounded-md text-[10px] font-semibold transition capitalize ${
                    activeLayer === key
                      ? 'bg-gradient-to-r from-brand-500 to-indigo-600 text-white shadow'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
                >
                  {LAYERS[key].label}
                </button>
              ))}
            </div>
          </div>

          {/* Leaflet map */}
          <MapContainer
            center={INDIA_CENTER}
            zoom={5}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{ height: 560, width: '100%' }}
          >
            <ZoomControl position="topright" />
            <TileLayer key={activeLayer} attribution={layer.attribution} url={layer.url} />
            {filtered.map((place) => {
              const color = CATEGORY_COLORS[place.category] || '#6366f1'
              const isActive = selectedPlace?.id === place.id
              return (
                <Marker
                  key={place.id}
                  position={[place.coordinates.lat, place.coordinates.lng]}
                  icon={makePinIcon(color, isActive)}
                  eventHandlers={{ click: () => setSelectedPlace(place) }}
                >
                  <Popup>
                    <div className="text-center py-1 min-w-[120px]">
                      <p className="font-bold text-slate-800 text-sm">{place.name}</p>
                      <p className="text-xs text-slate-500">{place.state}</p>
                      <span
                        className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                        style={{ background: color }}
                      >
                        {place.category}
                      </span>
                      <p className="text-xs text-slate-600 mt-1">⭐ {place.rating} · {place.duration}</p>
                      <p className="text-xs font-bold mt-1" style={{ color }}>{formatCurrency(place.price)}</p>
                    </div>
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>

          {/* Bottom badge */}
          <div className="flex items-center justify-between px-4 py-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur border-t border-white/20 dark:border-white/10">
            <div className="flex items-center gap-1.5">
              <FiNavigation className="text-brand-500 text-xs" />
              <span className="font-mono text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                {INDIA_CENTER[0]}°N · {INDIA_CENTER[1]}°E · Zoom 5
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Scroll to zoom · Click pin to select</span>
          </div>
        </div>

        {/* Sidebar — place list / selected detail */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {selectedPlace ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={selectedPlace.image}
                    alt={selectedPlace.name}
                    className="w-full h-44 object-cover"
                  />
                  <button
                    onClick={() => setSelectedPlace(null)}
                    className="absolute top-2 right-2 w-7 h-7 grid place-items-center bg-black/50 hover:bg-black/70 text-white rounded-full transition"
                  >
                    <FiX className="text-xs" />
                  </button>
                  <span
                    className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                    style={{ background: CATEGORY_COLORS[selectedPlace.category] || '#6366f1' }}
                  >
                    {selectedPlace.category}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h2 className="heading-display text-xl font-extrabold">{selectedPlace.name}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <FiMapPin className="text-brand-500" />
                      {selectedPlace.city}, {selectedPlace.state}
                    </p>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {selectedPlace.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { label: 'Rating', value: `⭐ ${selectedPlace.rating}` },
                      { label: 'Duration', value: selectedPlace.duration },
                      { label: 'Best Time', value: selectedPlace.bestTimeToVisit },
                      { label: 'Weather', value: selectedPlace.weather },
                    ].map((info) => (
                      <div key={info.label} className="bg-slate-50 dark:bg-white/5 rounded-xl p-2">
                        <p className="text-slate-400 text-[10px]">{info.label}</p>
                        <p className="font-semibold text-slate-800 dark:text-white mt-0.5">{info.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gradient-to-br from-brand-500 to-indigo-600 rounded-xl p-3 text-white text-center">
                    <p className="text-xs opacity-80">Est. Trip Cost</p>
                    <p className="heading-display text-2xl font-extrabold">{formatCurrency(selectedPlace.price)}</p>
                    <p className="text-[10px] opacity-70 mt-0.5">per person · {selectedPlace.duration}</p>
                  </div>
                  <Link
                    to={`/places/${selectedPlace.id}`}
                    className="btn-gradient w-full justify-center text-sm"
                  >
                    View Full Details →
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2 max-h-[660px] overflow-y-auto pr-1"
              >
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-1">
                  {filtered.length} destinations — click to select
                </p>
                {filtered.map((place) => (
                  <button
                    key={place.id}
                    onClick={() => setSelectedPlace(place)}
                    className="w-full text-left glass rounded-xl p-3 hover:shadow-lg transition flex items-center gap-3 group"
                  >
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-slate-800 dark:text-white truncate">
                        {place.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {place.state}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className="block w-2.5 h-2.5 rounded-full mb-1 ml-auto"
                        style={{ background: CATEGORY_COLORS[place.category] || '#6366f1' }}
                      />
                      <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
                        ⭐ {place.rating}
                      </p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend */}
          <div className="glass rounded-2xl p-4">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-1.5">
              <FiMapPin className="text-brand-500" /> Category Legend
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
                  <span className="text-[10px] text-slate-600 dark:text-slate-400">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
