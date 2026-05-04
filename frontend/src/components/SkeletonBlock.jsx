export default function SkeletonBlock({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-slate-200/80 dark:bg-white/10 ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
