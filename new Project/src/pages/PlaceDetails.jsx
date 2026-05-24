import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowLeft,
  FiHeart,
  FiStar,
  FiMapPin,
  FiClock,
  FiSun,
  FiCalendar,
  FiGlobe,
} from 'react-icons/fi'
import places, { findPlaceById } from '../data/places.js'
import { useSavedPlaces } from '../context/SavedPlacesContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import MapView from '../components/MapView.jsx'
import { fetchCountry } from '../utils/api.js'
import { formatCurrency } from '../utils/format.js'

export default function PlaceDetails() {
  const { placeId } = useParams()
  const navigate = useNavigate()
  const { savePlace, removePlace, isSaved } = useSavedPlaces()
  const { showToast } = useToast()

  const place = findPlaceById(placeId)

  
  const [country, setCountry] = useState(null)
  useEffect(() => {
    if (!place) return
    let active = true
    fetchCountry(place.country).then((data) => {
      if (active) setCountry(data)
    })
    return () => {
      active = false
    }
  }, [place])

  if (!place) {
    return (
      <div className="px-4 md:px-8 mt-10">
        <div className="glass rounded-3xl p-12 text-center max-w-xl mx-auto">
          <p className="text-6xl mb-3">🗺️</p>
          <h1 className="heading-display text-2xl font-bold">Place Not Found</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            We couldn't find that destination. It may have been moved or never
            existed.
          </p>
          <Link to="/places" className="btn-gradient mt-6">
            Browse all places
          </Link>
        </div>
      </div>
    )
  }

  const saved = isSaved(place.id)
  const handleSave = () => {
    if (saved) {
      removePlace(place.id)
      showToast(`${place.name} removed`, 'info')
    } else {
      savePlace(place)
      showToast(`${place.name} saved!`)
    }
  }

  return (
    <div className="px-4 md:px-8 mt-6">
      <button
        onClick={() => navigate(-1)}
        className="btn-outline mb-5"
      >
        <FiArrowLeft /> Back
      </button>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden h-[320px] md:h-[480px]"
      >
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="chip bg-white/20 backdrop-blur text-white">
              {place.category}
            </span>
            <h1 className="heading-display text-4xl md:text-5xl font-extrabold mt-2 drop-shadow">
              {place.name}
            </h1>
            <p className="flex items-center gap-2 mt-2 text-slate-200">
              <FiMapPin />{' '}
              {place.city
                ? `${place.city}, ${place.state || ''}${place.state ? ', ' : ''}${place.country}`
                : place.country}
            </p>
            {place.famousFor && (
              <p className="mt-2 text-amber-200 text-sm md:text-base">
                ✨ Famous for {place.famousFor}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className={`px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 transition ${
                saved
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FiHeart className={saved ? 'fill-current' : ''} />
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-6 md:p-8">
            <h2 className="heading-display text-2xl font-bold mb-3">
              About this destination
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {place.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              <Stat icon={<FiStar />} label="Rating" value={place.rating} />
              <Stat
                icon={<FiClock />}
                label="Duration"
                value={place.duration}
              />
              <Stat
                icon={<FiSun />}
                label="Weather"
                value={place.weather}
              />
              <Stat
                icon={<FiCalendar />}
                label="Best time"
                value={place.bestTimeToVisit}
              />
            </div>
          </div>

          {/* Cost breakdown */}
          <div className="glass rounded-3xl p-6 md:p-8">
            <h2 className="heading-display text-2xl font-bold mb-4">
              Estimated cost breakdown
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: 'Hotel', value: place.hotelPrice, color: 'from-brand-500 to-cyan-500' },
                { label: 'Food', value: place.foodPrice, color: 'from-amber-500 to-rose-500' },
                { label: 'Transport', value: place.transportPrice, color: 'from-emerald-500 to-teal-500' },
              ].map((c) => (
                <div
                  key={c.label}
                  className={`rounded-2xl p-4 text-white bg-gradient-to-br ${c.color}`}
                >
                  <p className="text-xs text-white/80">{c.label}</p>
                  <p className="heading-display text-2xl font-extrabold mt-1">
                    {formatCurrency(c.value)}
                  </p>
                </div>
              ))}
            </div>
            {place.travelDate && (
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                <b>Suggested travel date:</b>{' '}
                {new Date(place.travelDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>

          <div className="glass rounded-3xl p-6 md:p-8">
            <h2 className="heading-display text-2xl font-bold mb-4">
              Location
            </h2>
            <MapView coords={place.coordinates} name={place.name} state={place.state} height={380} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="glass rounded-3xl p-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Estimated trip cost
            </p>
            <p className="heading-display text-4xl font-extrabold mt-1">
              {formatCurrency(place.price)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              per person · {place.duration}
            </p>
            <button onClick={handleSave} className="btn-gradient w-full mt-5">
              <FiHeart /> {saved ? 'Saved to Favourites' : 'Save this trip'}
            </button>
            <Link
              to="/budget-planner"
              className="btn-outline w-full mt-2 justify-center"
            >
              Plan a budget
            </Link>
          </div>

          {country && (
            <div className="glass rounded-3xl p-6">
              <h3 className="heading-display font-bold mb-3 flex items-center gap-2">
                <FiGlobe /> Country info
              </h3>
              <div className="flex items-center gap-3 mb-4">
                {country.flags?.png && (
                  <img
                    src={country.flags.png}
                    alt={country.flags.alt || country.name?.common}
                    className="w-14 h-10 object-cover rounded shadow"
                  />
                )}
                <p className="font-semibold">{country.name?.common}</p>
              </div>
              <ul className="text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
                <li>
                  <b>Capital:</b> {country.capital?.[0] || '—'}
                </li>
                <li>
                  <b>Region:</b> {country.region}
                </li>
                <li>
                  <b>Population:</b>{' '}
                  {country.population?.toLocaleString() || '—'}
                </li>
                <li>
                  <b>Languages:</b>{' '}
                  {country.languages
                    ? Object.values(country.languages).join(', ')
                    : '—'}
                </li>
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-2xl p-4 bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10">
      <div className="text-brand-600 dark:text-brand-400 mb-1">{icon}</div>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className="font-semibold text-sm">{value}</p>
    </div>
  )
}
