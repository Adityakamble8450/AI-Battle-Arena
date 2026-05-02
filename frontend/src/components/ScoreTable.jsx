import React from 'react';

export default function ScoreTable({ criteria, totalScore1, totalScore2 }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Criteria</th>
            <th className="px-4 py-3 text-right font-medium text-slate-500 dark:text-slate-400">Model 1</th>
            <th className="px-4 py-3 text-right font-medium text-slate-500 dark:text-slate-400">Model 2</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((item) => (
            <tr key={item.name} className="border-b border-slate-200/80 last:border-b-0 dark:border-slate-700/80">
              <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{item.name}</td>
              <td className="px-4 py-3 text-right font-medium text-slate-900 dark:text-slate-100">{item.model1.toFixed(1)}</td>
              <td className="px-4 py-3 text-right font-medium text-slate-900 dark:text-slate-100">{item.model2.toFixed(1)}</td>
            </tr>
          ))}
          <tr>
            <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Total</td>
            <td className="px-4 py-3 text-right font-semibold text-violet-500">{totalScore1.toFixed(1)}</td>
            <td className="px-4 py-3 text-right font-semibold text-emerald-500">{totalScore2.toFixed(1)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
