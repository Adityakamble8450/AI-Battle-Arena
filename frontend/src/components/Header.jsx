import React from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-800/90">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            ClashMind AI
          </p>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">AI Battle Arena</p>
        </div>

        <button
          type="button"
          onClick={toggleDarkMode}
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          <span>{isDarkMode ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  );
}
