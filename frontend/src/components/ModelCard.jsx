import React from 'react';

function parseResponse(response) {
  return response.split(/```[\w-]*\n?|```/g).filter(Boolean);
}

export default function ModelCard({ title, score, response, isWinner }) {
  const sections = parseResponse(response);

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5 dark:border-slate-700">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            {isWinner && (
              <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Winner
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Generated response</p>
        </div>

        <div className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200">
          {score.toFixed(1)}/10
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        {sections.map((section, index) =>
          index % 2 === 0 ? (
            <p
              key={`${title}-text-${index}`}
              className="whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-300"
            >
              {section.trim()}
            </p>
          ) : (
            <pre
              key={`${title}-code-${index}`}
              className="overflow-x-auto rounded-md border border-slate-200 bg-slate-950 px-4 py-3 text-sm leading-6 text-slate-200 dark:border-slate-700"
            >
              <code>{section.trim()}</code>
            </pre>
          ),
        )}
      </div>
    </article>
  );
}
