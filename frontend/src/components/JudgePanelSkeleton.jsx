import { Trophy } from 'lucide-react';
import SkeletonBlock from './SkeletonBlock';

export default function JudgePanelSkeleton() {
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
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-white/10 dark:bg-black">
          <div className="grid grid-cols-[1.4fr_0.6fr_0.6fr] gap-4 border-b border-slate-200 px-4 py-3 dark:border-white/10">
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="ml-auto h-4 w-14" />
            <SkeletonBlock className="ml-auto h-4 w-14" />
          </div>
          <div className="space-y-4 px-4 py-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="grid grid-cols-[1.4fr_0.6fr_0.6fr] gap-4">
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="ml-auto h-4 w-10" />
                <SkeletonBlock className="ml-auto h-4 w-10" />
              </div>
            ))}
            <div className="grid grid-cols-[1.4fr_0.6fr_0.6fr] gap-4 pt-1">
              <SkeletonBlock className="h-4 w-16" />
              <SkeletonBlock className="ml-auto h-4 w-12" />
              <SkeletonBlock className="ml-auto h-4 w-12" />
            </div>
          </div>
        </div>

        <div className="flex min-h-[190px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-5 py-6 text-center shadow-sm dark:border-white/10 dark:bg-black">
          <div className="mb-3 rounded-full bg-emerald-500/10 p-3 text-emerald-500 dark:text-emerald-300">
            <Trophy size={22} />
          </div>
          <SkeletonBlock className="h-4 w-16" />
          <SkeletonBlock className="mt-4 h-7 w-28" />
          <SkeletonBlock className="mt-4 h-4 w-32" />
        </div>

        <div className="grid gap-4">
          {[0, 1].map((panel) => (
            <div
              key={panel}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-white/10 dark:bg-black"
            >
              <SkeletonBlock className="h-5 w-36" />
              <SkeletonBlock className="mt-4 h-4 w-full" />
              <SkeletonBlock className="mt-3 h-4 w-11/12" />
              <SkeletonBlock className="mt-3 h-4 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
