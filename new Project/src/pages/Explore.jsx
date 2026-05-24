import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTarget } from 'react-icons/fi'
import places from '../data/places.js'
import PlaceCard from '../components/PlaceCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
import useDebounce from '../hooks/useDebounce.js'

const PRICE_RANGES = [
  { label: 'Any price', min: 0, max: Infinity },
  { label: 'Under ₹15,000', min: 0, max: 15000 },
  { label: '₹15,000 – ₹20,000', min: 15000, max: 20000 },
  { label: 'Over ₹20,000', min: 20000, max: Infinity },
]

const SORTS = [
  { value: 'rating-desc', label: 'Top rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A → Z' },
]

export default function Explore() {
  const [params] = useSearchParams()
  const initialQuery = params.get('q') || ''

 
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState('All')
  const [priceIdx, setPriceIdx] = useState(0)
  const [sort, setSort] = useState('rating-desc')
  const [loading, setLoading] = useState(true)

  const debouncedQuery = useDebounce(query, 250)

  const searchRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    const range = PRICE_RANGES[priceIdx]
    const list = places.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q)
      const matchesCategory = category === 'All' || p.category === category
      const matchesPrice = p.price >= range.min && p.price <= range.max
      return matchesQuery && matchesCategory && matchesPrice
    })

    return [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'rating-desc':
        default:
          return b.rating - a.rating
      }
    })
  }, [debouncedQuery, category, priceIdx, sort])

  return (
    <div className="px-4 md:px-8 mt-6">
      <header className="mb-6">
        <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm">
          Explore
        </p>
        <h1 className="heading-display text-3xl md:text-4xl font-bold">
          Discover your next escape
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Filter by category, price, rating and more.
        </p>
      </header>

      <div className="glass rounded-3xl p-4 md:p-5 sticky top-24 z-30">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="flex-1">
            <SearchBar ref={searchRef} value={query} onChange={setQuery} />
          </div>
          <button
            onClick={() => searchRef.current?.focus()}
            className="btn-outline whitespace-nowrap"
            title="Focus search input (uses useRef)"
          >
            <FiTarget /> Focus Search
          </button>
          <select
            value={priceIdx}
            onChange={(e) => setPriceIdx(Number(e.target.value))}
            className="px-4 py-3 rounded-full bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {PRICE_RANGES.map((r, i) => (
              <option key={r.label} value={i}>
                {r.label}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-3 rounded-full bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <CategoryFilter value={category} onChange={setCategory} />
        </div>
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between mt-6 mb-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-slate-900 dark:text-white">
            {filtered.length}
          </span>{' '}
          {filtered.length === 1 ? 'place' : 'places'} found
          {category !== 'All' && (
            <>
              {' '}
              in <span className="font-semibold">{category}</span>
            </>
          )}
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-3xl p-12 text-center"
        >
          <p className="text-5xl mb-3">🌫️</p>
          <h3 className="heading-display text-xl font-bold">No places match</h3>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Try clearing filters or searching another destination.
          </p>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      )}
    </div>
  )
}
