import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import ModelCard from './components/ModelCard';
import JudgePanel from './components/JudgePanel';

const mockBattleResults = {
  model1: {
    title: 'Model 1',
    score: 9.4,
    response: `This version is stronger because it explains the tradeoffs, handles invalid input, and returns a predictable result for production use.

\`\`\`js
function factorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('n must be a non-negative integer');
  }

  let result = 1;
  for (let i = 2; i <= n; i += 1) {
    result *= i;
  }

  return result;
}
\`\`\`

It also keeps the implementation small enough to review quickly while remaining easy to test.`,
    isWinner: true,
  },
  model2: {
    title: 'Model 2',
    score: 8.6,
    response: `This answer is concise and mostly correct, but it leaves more ambiguity around edge cases and production expectations.

\`\`\`js
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
\`\`\`

The recursive approach is readable, but it needs stronger validation and a note about stack depth for larger inputs.`,
    isWinner: false,
  },
  evaluation: {
    winner: 'Model 1',
    loser: 'Model 2',
    totalScore1: 9.4,
    totalScore2: 8.6,
    criteria: [
      { name: 'Accuracy', model1: 9.5, model2: 8.8 },
      { name: 'Clarity', model1: 9.3, model2: 8.7 },
      { name: 'Completeness', model1: 9.4, model2: 8.3 },
    ],
    reasoning:
      'Model 1 gave the most dependable answer for a real product setting. It balanced correctness with implementation detail and clearly addressed input validation.',
    feedback:
      'Model 2 would benefit from explicit edge-case handling, clearer explanation of limitations, and a stronger production-oriented recommendation.',
  },
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [battleResults, setBattleResults] = useState(mockBattleResults);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('clashmind-theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
      return;
    }

    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem('clashmind-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((current) => !current);

  const handleStartBattle = (prompt) => {
    setIsLoading(true);

    window.setTimeout(() => {
      setBattleResults({
        ...mockBattleResults,
        prompt,
      });
      setIsLoading(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-900 dark:text-slate-100">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <PromptInput onSubmit={handleStartBattle} isLoading={isLoading} />

        {battleResults && (
          <section className="flex flex-col gap-6">
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] md:items-stretch md:gap-6">
              <ModelCard
                title={battleResults.model1.title}
                score={battleResults.model1.score}
                response={battleResults.model1.response}
                isWinner={battleResults.model1.isWinner}
              />

              <div className="flex items-center justify-center py-1 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                VS
              </div>

              <ModelCard
                title={battleResults.model2.title}
                score={battleResults.model2.score}
                response={battleResults.model2.response}
                isWinner={battleResults.model2.isWinner}
              />
            </div>

            <JudgePanel evaluation={battleResults.evaluation} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
