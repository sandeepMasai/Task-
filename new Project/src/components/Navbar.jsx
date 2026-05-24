import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { FiSun, FiMoon, FiMenu, FiX, FiHeart, FiCompass } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'
import { useSavedPlaces } from '../context/SavedPlacesContext.jsx'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/places', label: 'Explore' },
  { to: '/saved', label: 'Saved' },
  { to: '/india-map', label: '🗺 India Map' },
  { to: '/budget-planner', label: 'Budget Planner' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { saved } = useSavedPlaces()
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 rounded-full text-sm font-medium transition ${
      isActive
        ? 'text-brand-600 dark:text-brand-300'
        : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-300'
    }`

  return (
    <header className="sticky top-0 z-50">
      <div className="glass mx-3 md:mx-6 mt-3 rounded-2xl">
        <nav className="flex items-center justify-between px-4 md:px-6 py-3">
        
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 grid place-items-center text-white shadow-lg shadow-brand-500/30">
              <FiCompass className="text-lg" />
            </div>
            <span className="heading-display font-extrabold text-lg md:text-xl">
              Bharat<span className="text-brand-600 dark:text-brand-400">Yatra</span>
            </span>
          </Link>

         
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={linkClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

        
          <div className="flex items-center gap-2">
            <Link
              to="/saved"
              className="hidden sm:inline-flex relative items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition"
              aria-label="Saved places"
            >
              <FiHeart />
              {saved.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-5 h-5 grid place-items-center">
                  {saved.length}
                </span>
              )}
            </Link>
            <button
              onClick={toggleTheme}
              className="w-10 h-10 grid place-items-center rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-10 h-10 grid place-items-center rounded-full bg-slate-100 dark:bg-white/10"
              aria-label="Menu"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>

      
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-white/30 dark:border-white/10 px-4 pb-3"
            >
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-2.5 text-sm font-medium ${
                        isActive
                          ? 'text-brand-600 dark:text-brand-300'
                          : 'text-slate-700 dark:text-slate-200'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
