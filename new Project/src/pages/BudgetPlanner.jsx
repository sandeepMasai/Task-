import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiHome,
  FiCoffee,
  FiNavigation,
  FiActivity,
  FiUsers,
  FiCalendar,
  FiRefreshCw,
} from 'react-icons/fi'
import { formatCurrency } from '../utils/format.js'

const FIELDS = [
  { key: 'hotel', label: 'Hotel / Stay', icon: <FiHome />, color: 'from-brand-500 to-cyan-500' },
  { key: 'food', label: 'Food', icon: <FiCoffee />, color: 'from-amber-500 to-rose-500' },
  { key: 'travel', label: 'Travel', icon: <FiNavigation />, color: 'from-emerald-500 to-teal-500' },
  { key: 'activities', label: 'Activities', icon: <FiActivity />, color: 'from-purple-500 to-fuchsia-500' },
]

const initial = { hotel: 4000, food: 2500, travel: 3500, activities: 1500, days: 5, travelers: 2 }

export default function BudgetPlanner() {
  const [values, setValues] = useState(initial)

  const update = (key, val) =>
    setValues((v) => ({ ...v, [key]: Math.max(0, Number(val) || 0) }))

  // useMemo: derived totals
  const { perPerson, total, breakdown } = useMemo(() => {
    const sum = FIELDS.reduce((s, f) => s + (values[f.key] || 0), 0)
    const breakdown = FIELDS.map((f) => ({
      ...f,
      amount: values[f.key] || 0,
      percent: sum > 0 ? ((values[f.key] || 0) / sum) * 100 : 0,
    }))
    const total = sum * (values.travelers || 1)
    return { perPerson: sum, total, breakdown }
  }, [values])

  return (
    <div className="px-4 md:px-8 mt-6">
      <header className="mb-6">
        <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm">
          Tools
        </p>
        <h1 className="heading-display text-3xl md:text-4xl font-bold">
          Budget Planner
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Estimate your trip cost in seconds.
        </p>
      </header>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-3 glass rounded-3xl p-6 md:p-8">
          <div className="grid sm:grid-cols-2 gap-4">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
                  <span
                    className={`w-7 h-7 rounded-lg grid place-items-center text-white bg-gradient-to-br ${f.color}`}
                  >
                    {f.icon}
                  </span>
                  {f.label}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={values[f.key]}
                    onChange={(e) => update(f.key, e.target.value)}
                    className="w-full pl-7 pr-3 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
                <span className="w-7 h-7 rounded-lg grid place-items-center text-white bg-slate-700">
                  <FiCalendar />
                </span>
                Trip Duration (days)
              </label>
              <input
                type="number"
                min={1}
                value={values.days}
                onChange={(e) => update('days', e.target.value)}
                className="w-full px-3 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
                <span className="w-7 h-7 rounded-lg grid place-items-center text-white bg-slate-700">
                  <FiUsers />
                </span>
                Travelers
              </label>
              <input
                type="number"
                min={1}
                value={values.travelers}
                onChange={(e) => update('travelers', e.target.value)}
                className="w-full px-3 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setValues(initial)}
              className="btn-outline"
            >
              <FiRefreshCw /> Reset
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div
            key={total}
            initial={{ scale: 0.97, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-3xl p-7 text-white bg-gradient-to-br from-brand-600 via-indigo-600 to-purple-600 shadow-xl"
          >
            <p className="text-sm text-white/80">Total estimated cost</p>
            <p className="heading-display text-5xl font-extrabold mt-1">
              {formatCurrency(total)}
            </p>
            <p className="text-sm text-white/80 mt-2">
              {formatCurrency(perPerson)} / person · {values.travelers} traveler(s) ·{' '}
              {values.days} days
            </p>
          </motion.div>

          <div className="glass rounded-3xl p-6">
            <h3 className="heading-display font-bold mb-4">Breakdown</h3>
            <ul className="space-y-3">
              {breakdown.map((b) => (
                <li key={b.key}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{b.label}</span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {formatCurrency(b.amount)} · {b.percent.toFixed(0)}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-slate-200/70 dark:bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${b.percent}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full bg-gradient-to-r ${b.color}`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {FIELDS.map((f) => (
              <div key={f.key} className="glass rounded-2xl p-4">
                <div
                  className={`w-9 h-9 rounded-lg grid place-items-center text-white bg-gradient-to-br ${f.color}`}
                >
                  {f.icon}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  {f.label}
                </p>
                <p className="font-bold">{formatCurrency(values[f.key])}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
