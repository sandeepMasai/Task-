import { categories } from '../data/places.js'

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 py-1">
      {categories.map((c) => {
        const active = value === c
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
              active
                ? 'bg-gradient-to-r from-brand-500 to-indigo-600 text-white shadow-lg shadow-brand-500/30'
                : 'bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white'
            }`}
          >
            {c}
          </button>
        )
      })}
    </div>
  )
}
