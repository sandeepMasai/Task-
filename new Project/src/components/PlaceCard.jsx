import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiStar, FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi'
import { useSavedPlaces } from '../context/SavedPlacesContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { formatCurrency } from '../utils/format.js'

function PlaceCard({ place }) {
  const { savePlace, removePlace, isSaved } = useSavedPlaces()
  const { showToast } = useToast()
  const saved = isSaved(place.id)

  const handleSave = (e) => {
    e.preventDefault()
    if (saved) {
      removePlace(place.id)
      showToast(`${place.name} removed`, 'info')
    } else {
      savePlace(place)
      showToast(`${place.name} saved!`)
    }
  }

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className="group glass rounded-3xl overflow-hidden flex flex-col"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
        <span className="absolute top-3 left-3 chip bg-white/80 dark:bg-white/15 backdrop-blur">
          {place.category}
        </span>
        <button
          onClick={handleSave}
          aria-label="Save place"
          className={`absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full backdrop-blur transition ${
            saved
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 dark:bg-white/20 text-slate-700 dark:text-white hover:bg-rose-500 hover:text-white'
          }`}
        >
          <FiHeart className={saved ? 'fill-current' : ''} />
        </button>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <h3 className="heading-display font-bold text-lg drop-shadow">
            {place.name}
          </h3>
          <span className="flex items-center gap-1 text-sm bg-black/40 px-2 py-0.5 rounded-full backdrop-blur">
            <FiStar className="text-amber-300" /> {place.rating}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1 truncate">
            <FiMapPin className="text-brand-500 shrink-0" />
            <span className="truncate">
              {place.city ? `${place.city}, ${place.state || place.country}` : place.country}
            </span>
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <FiClock /> {place.duration}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {place.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">From</p>
            <p className="font-bold text-lg">{formatCurrency(place.price)}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className={`px-3 py-2 rounded-full text-sm font-semibold transition ${
                saved
                  ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300'
                  : 'bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20'
              }`}
            >
              {saved ? 'Saved' : 'Save'}
            </button>
            <Link
              to={`/places/${place.id}`}
              className="btn-gradient !px-4 !py-2 text-sm"
            >
              View <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default memo(PlaceCard)
