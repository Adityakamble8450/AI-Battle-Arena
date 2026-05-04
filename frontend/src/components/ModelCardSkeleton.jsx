import SkeletonBlock from './SkeletonBlock';

export default function ModelCardSkeleton({ title }) {
  return (
    <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-black">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-4 dark:border-white/10">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
            <SkeletonBlock className="h-6 w-16 rounded-full" />
          </div>
          <SkeletonBlock className="mt-3 h-4 w-32 rounded-full" />
        </div>

        <SkeletonBlock className="h-9 w-20 rounded-full" />
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 md:max-h-[32rem]">
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-11/12" />
        <SkeletonBlock className="h-4 w-4/5" />
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 dark:border-white/10">
          <div className="border-b border-white/10 bg-black/70 px-4 py-2">
            <SkeletonBlock className="h-3 w-16 bg-white/10 dark:bg-white/15" />
          </div>
          <div className="space-y-3 px-4 py-4">
            <SkeletonBlock className="h-3 w-full bg-white/10 dark:bg-white/15" />
            <SkeletonBlock className="h-3 w-10/12 bg-white/10 dark:bg-white/15" />
            <SkeletonBlock className="h-3 w-8/12 bg-white/10 dark:bg-white/15" />
            <SkeletonBlock className="h-3 w-9/12 bg-white/10 dark:bg-white/15" />
          </div>
        </div>
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-5/6" />
      </div>
    </article>
  );
}
