import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="px-4 md:px-8 mt-10">
      <div className="glass rounded-3xl p-12 text-center max-w-xl mx-auto">
        <p className="heading-display text-7xl font-extrabold bg-gradient-to-r from-brand-500 to-indigo-600 bg-clip-text text-transparent">
          404
        </p>
        <h1 className="heading-display text-2xl font-bold mt-2">
          Looks like you're off the map
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/" className="btn-gradient mt-6">
          <FiArrowLeft /> Back to Home
        </Link>
      </div>
    </div>
  )
}
