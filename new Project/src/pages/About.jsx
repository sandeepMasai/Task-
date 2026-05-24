import { Link } from 'react-router-dom'
import {
  FiCompass,
  FiHeart,
  FiMap,
  FiDollarSign,
  FiSun,
  FiCode,
  FiArrowRight,
} from 'react-icons/fi'

const features = [
  { icon: <FiCompass />, title: 'Curated destinations', desc: 'Hand-picked travel inspiration from around the world.' },
  { icon: <FiHeart />, title: 'Save favourites', desc: 'Bookmark places and access them anytime — even offline.' },
  { icon: <FiMap />, title: 'Interactive maps', desc: 'Powered by Leaflet & OpenStreetMap.' },
  { icon: <FiDollarSign />, title: 'Budget planning', desc: 'Plan trip costs by hotel, food, travel and activities.' },
  { icon: <FiSun />, title: 'Dark / Light theme', desc: 'Beautiful UI in any lighting — system aware.' },
  { icon: <FiCode />, title: 'Built with React', desc: 'Modern hooks, Context API, Tailwind & Framer Motion.' },
]

export default function About() {
  return (
    <div className="px-4 md:px-8 mt-6">
      <section className="glass rounded-3xl p-8 md:p-14 text-center">
        <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm">
          About BharatYatra
        </p>
        <h1 className="heading-display text-3xl md:text-5xl font-extrabold mt-2 max-w-3xl mx-auto">
          A modern, internship-ready React project for explorers and learners.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          BharatYatra is a learning-focused single-page application built with the
          latest React patterns. It demonstrates routing, hooks, context, memoisation,
          API integration and a beautiful responsive UI.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/places" className="btn-gradient">
            Start exploring <FiArrowRight />
          </Link>
          <Link to="/budget-planner" className="btn-outline">
            Try the planner
          </Link>
        </div>
      </section>

      <section className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => (
          <div key={f.title} className="glass rounded-3xl p-6">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 grid place-items-center text-white text-lg">
              {f.icon}
            </div>
            <h3 className="heading-display font-bold mt-4">{f.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {f.desc}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10 glass rounded-3xl p-8 md:p-12">
        <h2 className="heading-display text-2xl md:text-3xl font-bold">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            'React 18',
            'React Router 6',
            'Tailwind CSS',
            'Framer Motion',
            'Leaflet',
            'Axios',
            'React Icons',
            'Context API',
          ].map((t) => (
            <span
              key={t}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-500/10 to-indigo-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-sm font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
