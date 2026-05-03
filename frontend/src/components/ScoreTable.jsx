export default function ScoreTable({ criteria, totalScore1, totalScore2 }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-white/10 dark:bg-black">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-white/10">
            <th className="px-4 py-3 font-medium text-slate-500 dark:text-white/45">Criteria</th>
            <th className="px-4 py-3 text-right font-medium text-slate-500 dark:text-white/45">Model 1</th>
            <th className="px-4 py-3 text-right font-medium text-slate-500 dark:text-white/45">Model 2</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((item) => (
            <tr key={item.name} className="border-b border-slate-200/80 last:border-b-0 dark:border-white/10">
              <td className="px-4 py-3 text-slate-700 dark:text-white/82">{item.name}</td>
              <td className="px-4 py-3 text-right font-medium text-slate-900 dark:text-slate-100">{item.model1.toFixed(1)}</td>
              <td className="px-4 py-3 text-right font-medium text-slate-900 dark:text-slate-100">{item.model2.toFixed(1)}</td>
            </tr>
          ))}
          <tr>
            <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Total</td>
            <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">{totalScore1.toFixed(1)}</td>
            <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">{totalScore2.toFixed(1)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
