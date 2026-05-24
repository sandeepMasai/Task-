export default function SkeletonCard() {
  return (
    <div className="glass rounded-3xl overflow-hidden animate-pulse">
      <div className="h-52 bg-slate-200/70 dark:bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-slate-200/70 dark:bg-white/5 rounded w-2/3" />
        <div className="h-3 bg-slate-200/70 dark:bg-white/5 rounded w-full" />
        <div className="h-3 bg-slate-200/70 dark:bg-white/5 rounded w-5/6" />
        <div className="h-9 bg-slate-200/70 dark:bg-white/5 rounded-full w-1/2 mt-4" />
      </div>
    </div>
  )
}
