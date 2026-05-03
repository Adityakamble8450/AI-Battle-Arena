import SolutionContent from './SolutionContent';

export default function ModelCard({ title, score, response, isWinner }) {
  return (
    <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-4 dark:border-slate-700">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
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

      <SolutionContent response={response} title={title} />
    </article>
  );
}
