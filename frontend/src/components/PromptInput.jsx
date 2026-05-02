import React, { useState } from 'react';

const MAX_CHARACTERS = 2000;

export default function PromptInput({ onSubmit, isLoading }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-2">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Prompt</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Compare responses from two models and let the judge decide the stronger answer.
            </p>
          </div>

          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value.slice(0, MAX_CHARACTERS))}
            placeholder="Enter your problem or prompt..."
            className="min-h-[168px] w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {prompt.length}/{MAX_CHARACTERS} characters
          </p>

          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="inline-flex items-center justify-center rounded-md bg-violet-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Starting...' : 'Start Battle'}
          </button>
        </div>
      </form>
    </section>
  );
}
