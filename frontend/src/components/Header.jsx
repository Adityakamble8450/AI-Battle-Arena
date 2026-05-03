import { Moon, Sun } from 'lucide-react';

export default function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/90">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div>
          <p className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
            ClashMind AI
          </p>
          <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-white/45">
            AI Battle Arena
          </p>
        </div>

        <button
          type="button"
          onClick={toggleDarkMode}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-200 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/90"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          <span>{isDarkMode ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  );
}
