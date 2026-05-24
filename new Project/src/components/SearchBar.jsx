import { forwardRef } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

const SearchBar = forwardRef(function SearchBar(
  { value, onChange, placeholder = 'Search destinations…' },
  ref
) {
  return (
    <div className="relative w-full">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 rounded-full bg-white/80 dark:bg-white/5
                   border border-white/40 dark:border-white/10 backdrop-blur
                   focus:outline-none focus:ring-2 focus:ring-brand-500
                   placeholder:text-slate-400"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        >
          <FiX />
        </button>
      )}
    </div>
  )
})

export default SearchBar
