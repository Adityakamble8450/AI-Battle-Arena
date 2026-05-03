import { Trophy } from 'lucide-react';
import ScoreTable from './ScoreTable';

export default function JudgePanel({ evaluation }) {
  if (!evaluation) return null;

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-neutral-950">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-100 p-2 text-slate-700 dark:border-white/10 dark:bg-white dark:text-black">
          <Trophy size={18} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">AI Judge</h2>
          <p className="text-sm text-slate-500 dark:text-white/45">
            Side-by-side scoring and final recommendation.
          </p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.7fr_1fr]">
        <ScoreTable
          criteria={evaluation.criteria}
          totalScore1={evaluation.totalScore1}
          totalScore2={evaluation.totalScore2}
        />

        <div className="flex min-h-[190px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-5 py-6 text-center shadow-sm dark:border-white/10 dark:bg-black">
          <div className="mb-3 rounded-full bg-emerald-500/10 p-3 text-emerald-500 dark:text-emerald-300">
            <Trophy size={22} />
          </div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-white/40">
            Winner
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
            {evaluation.winner}
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-white/55">
            {evaluation.winner} is the winner
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-white/10 dark:bg-black">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Why {evaluation.winner} won
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white/70">
              {evaluation.reasoning}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-white/10 dark:bg-black">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Feedback for {evaluation.loser}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white/70">
              {evaluation.feedback}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
