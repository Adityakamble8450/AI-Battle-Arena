import { useState } from 'react';

const MAX_CHARACTERS = 2000;

export default function PromptInput({ onSubmit, isLoading }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
      setPrompt('');
    }
  };

  return (
    <section className="rounded-[30px] border border-slate-200 bg-white/95 p-3 shadow-lg shadow-slate-200/50 backdrop-blur dark:border-white/10 dark:bg-neutral-950/95 dark:shadow-black/40">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value.slice(0, MAX_CHARACTERS))}
          placeholder="Ask the arena to compare answers..."
          className="min-h-[78px] w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-300/40 dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/35 dark:focus:border-white/25 dark:focus:ring-white/10"
          disabled={isLoading}
        />

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-white/40">
            {prompt.length}/{MAX_CHARACTERS}
          </p>
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            {isLoading ? 'Starting...' : 'Start Battle'}
          </button>
        </div>
      </form>
    </section>
  );
}
