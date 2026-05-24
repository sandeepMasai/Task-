import { Link } from 'react-router-dom'
import { FiCompass, FiGithub, FiTwitter, FiInstagram, FiMapPin, FiBookmark, FiDollarSign, FiMap, FiCode } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="mt-20 px-4 md:px-8 pb-6">
      <div className="glass rounded-3xl overflow-hidden">

        
        <div className="h-1 w-full bg-gradient-to-r from-brand-500 via-indigo-500 to-amber-400" />

        <div className="p-8 md:p-12">
         
          <div className="grid md:grid-cols-12 gap-10">

        
            <div className="md:col-span-4 space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 grid place-items-center text-white shadow-lg shadow-brand-500/30">
                  <FiCompass className="text-lg" />
                </div>
                <span className="heading-display font-extrabold text-xl">
                  Bharat<span className="text-brand-600 dark:text-brand-400">Yatra</span>
                </span>
              </Link>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Providing high fidelity geographic itineraries, dynamic budget
                calculators, and tourism parameters across{' '}
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  25 legendary travel spots
                </span>{' '}
                in India.
              </p>
             
              <div className="flex gap-2 pt-1">
                {[
                  { icon: <FiGithub />, href: '#' },
                  { icon: <FiTwitter />, href: '#' },
                  { icon: <FiInstagram />, href: '#' },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="w-9 h-9 grid place-items-center rounded-full bg-slate-100 dark:bg-white/10
                               hover:bg-gradient-to-br hover:from-brand-500 hover:to-indigo-600 hover:text-white transition"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-3">
              <h4 className="heading-display font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <FiMapPin className="text-brand-500" /> Destinations
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <Link to="/places" className="hover:text-brand-600 dark:hover:text-brand-400 transition flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-brand-400 inline-block" />
                    All India Directory
                  </Link>
                </li>
                <li>
                  <Link to="/budget-planner" className="hover:text-brand-600 dark:hover:text-brand-400 transition flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-brand-400 inline-block" />
                    Budget Planners
                  </Link>
                </li>
                <li>
                  <Link to="/saved" className="hover:text-brand-600 dark:hover:text-brand-400 transition flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-brand-400 inline-block" />
                    Bookmarked Journeys
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="heading-display font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <FiMap className="text-amber-500" /> Classic Routes
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <Link to="/places?q=Rajasthan" className="hover:text-brand-600 dark:hover:text-brand-400 transition flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-400 inline-block mt-1.5 shrink-0" />
                    Golden Triangle
                    <span className="text-xs text-slate-400 dark:text-slate-500">(Jaipur, Agra)</span>
                  </Link>
                </li>
                <li>
                  <Link to="/places?q=Himachal" className="hover:text-brand-600 dark:hover:text-brand-400 transition flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-400 inline-block mt-1.5 shrink-0" />
                    Himalayan Retreats
                    <span className="text-xs text-slate-400 dark:text-slate-500">(Manali, Shimla)</span>
                  </Link>
                </li>
                <li>
                  <Link to="/places?q=Kerala" className="hover:text-brand-600 dark:hover:text-brand-400 transition flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-400 inline-block mt-1.5 shrink-0" />
                    Kerala Backwaters &amp; Hills
                  </Link>
                </li>
              </ul>
            </div>

          </div>

       

          <div className="mt-8 pt-6 border-t border-white/20 dark:border-white/10 flex flex-col md:flex-row justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
            <p>
              © {new Date().getFullYear()}{' '}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                BharatYatra
              </span>
              . Crafted for learning React.
            </p>
            <p>Built with React 18 · Tailwind CSS · Framer Motion · Leaflet</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
