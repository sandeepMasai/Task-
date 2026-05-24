import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiSearch, FiCompass, FiMapPin, FiStar } from 'react-icons/fi'
import places from '../data/places.js'
import PlaceCard from '../components/PlaceCard.jsx'

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/places?q=${encodeURIComponent(query.trim())}`)
  }

  const sorted = [...places].sort((a, b) => b.rating - a.rating)
  const featured = sorted.slice(0, 3)
  const trending = sorted.slice(3, 9)

  return (
    <div className="px-4 md:px-8">
      {/* Hero */}
      <section className="relative mt-4 rounded-[2rem] overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-slate-900/40" />
        <div className="relative px-6 md:px-12 py-20 md:py-32 text-white max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="chip bg-white/15 border border-white/20 text-white"
          >
            <FiCompass /> Plan smarter. Travel further.
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display mt-5 text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Discover the world's <br />
            most{' '}
            <span className="bg-gradient-to-r from-brand-300 to-amber-300 bg-clip-text text-transparent">
              breathtaking places
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-4 text-base md:text-lg text-slate-200 max-w-2xl"
          >
            From sun-soaked beaches to alpine peaks — explore curated destinations,
            save your favourites and plan a trip that fits your budget.
          </motion.p>

          {/* Hero search */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onSubmit={handleSearch}
            className="mt-8 glass rounded-full p-1.5 flex items-center max-w-xl"
          >
            <FiSearch className="text-slate-400 ml-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Where do you want to go?"
              className="flex-1 bg-transparent px-3 py-2 outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            <button type="submit" className="btn-gradient">
              Search <FiArrowRight />
            </button>
          </motion.form>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Link to="/places" className="btn-gradient">
              Explore Places <FiArrowRight />
            </Link>
            <Link
              to="/budget-planner"
              className="btn-outline !text-white !border-white/30 hover:!bg-white/10"
            >
              Plan a Budget
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { v: '120+', l: 'Destinations' },
              { v: '4.8★', l: 'Avg. rating' },
              { v: '50k', l: 'Happy travelers' },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl px-4 py-3 text-center">
                <p className="heading-display text-xl font-bold">{s.v}</p>
                <p className="text-xs text-slate-200">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mt-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm">
              Featured
            </p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold">
              Top-rated destinations
            </h2>
          </div>
          <Link
            to="/places"
            className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline"
          >
            View all <FiArrowRight />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mt-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm">
              Trending now
            </p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold">
              Where everyone's heading
            </h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trending.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-indigo-600 to-purple-600 p-8 md:p-14 text-white">
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl" />
        <div className="relative max-w-2xl">
          <h3 className="heading-display text-3xl md:text-4xl font-extrabold">
            Ready for your next adventure?
          </h3>
          <p className="mt-3 text-white/80">
            Save destinations, build itineraries and calculate budgets — all in one
            place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/places"
              className="bg-white text-brand-700 font-semibold px-5 py-2.5 rounded-full hover:bg-slate-100 transition inline-flex items-center gap-2"
            >
              Start Exploring <FiArrowRight />
            </Link>
            <Link to="/about" className="btn-outline !text-white !border-white/40">
              Learn more
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
