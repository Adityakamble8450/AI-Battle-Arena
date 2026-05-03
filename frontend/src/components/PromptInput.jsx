import { useState } from 'react';

const MAX_CHARACTERS = 2000;

export default function PromptInput({ onSubmit, isLoading, initialPrompt = '' }) {
  const [prompt, setPrompt] = useState(initialPrompt);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white/95 p-3 shadow-lg shadow-slate-200/50 backdrop-blur dark:border-slate-700 dark:bg-slate-800/95 dark:shadow-black/20">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value.slice(0, MAX_CHARACTERS))}
          placeholder="Ask the arena to compare answers..."
          className="min-h-[60px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
          disabled={isLoading}
        />

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {prompt.length}/{MAX_CHARACTERS}
          </p>
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="inline-flex items-center justify-center rounded-2xl bg-violet-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Starting...' : 'Start Battle'}
          </button>
        </div>
      </form>
    </section>
  );
}
