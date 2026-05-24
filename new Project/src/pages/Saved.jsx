import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiArrowRight } from 'react-icons/fi'
import { useSavedPlaces } from '../context/SavedPlacesContext.jsx'
import PlaceCard from '../components/PlaceCard.jsx'
import { formatCurrency } from '../utils/format.js'

export default function Saved() {
  const { saved } = useSavedPlaces()

  const totalBudget = useMemo(
    () => saved.reduce((sum, p) => sum + (Number(p.price) || 0), 0),
    [saved]
  )

  return (
    <div className="px-4 md:px-8 mt-6">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm">
            Your collection
          </p>
          <h1 className="heading-display text-3xl md:text-4xl font-bold">
            Saved Places
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {saved.length} {saved.length === 1 ? 'destination' : 'destinations'} saved
          </p>
        </div>
        <div className="glass rounded-2xl p-5 md:min-w-[260px]">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total estimated budget
          </p>
          <p className="heading-display text-3xl font-extrabold">
            {formatCurrency(totalBudget)}
          </p>
        </div>
      </header>

      {saved.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <FiHeart className="text-5xl mx-auto text-rose-400 mb-3" />
          <h3 className="heading-display text-xl font-bold">
            No favourites yet
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-1 mb-5">
            Tap the heart on any destination to save it for later.
          </p>
          <Link to="/places" className="btn-gradient">
            Explore Places <FiArrowRight />
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      )}
    </div>
  )
}
