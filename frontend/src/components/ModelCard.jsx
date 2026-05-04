import SolutionContent from './SolutionContent';

export default function ModelCard({ title, score, response, isWinner }) {
  return (
    <article className="flex min-h-0 flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm md:h-[46rem] dark:border-white/10 dark:bg-[#020202]">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-slate-50/70 px-4 py-4 dark:border-white/10 dark:bg-white/[0.02]">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
            {isWinner && (
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-300">
                Winner
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-white/45">Generated response</p>
        </div>

        <div className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white dark:text-black">
          {score.toFixed(1)}/10
        </div>
      </div>

      <SolutionContent response={response} title={title} />
    </article>
  );
}
