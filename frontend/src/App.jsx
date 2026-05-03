import { useEffect, useState } from 'react';
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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = window.localStorage.getItem('clashmind-theme');
    if (storedTheme) {
      return storedTheme === 'dark';
    }

    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [battleResults, setBattleResults] = useState(mockBattleResults);
  const [latestPrompt, setLatestPrompt] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem('clashmind-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((current) => !current);

  const handleStartBattle = (prompt) => {
    setIsLoading(true);
    setLatestPrompt(prompt);

    window.setTimeout(() => {
      setBattleResults({
        ...mockBattleResults,
        prompt,
      });
      setIsLoading(false);
    }, 900);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-900 dark:text-slate-100">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 overflow-hidden">
        <section className="mx-auto flex h-full w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
          <div className="flex-1 overflow-y-auto py-5">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
              {!battleResults?.prompt && !isLoading && (
                <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-[32px] border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Battle Chat
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                    Type a prompt below and the model comparison will appear here.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                    The prompt stays at the bottom like a chat composer, while the answers and judge report stack above it for easier reading.
                  </p>
                </div>
              )}

              {battleResults?.prompt && (
                <>
                  <div className="flex justify-end">
                    <div className="max-w-3xl rounded-[28px] rounded-br-md bg-violet-700 px-5 py-4 text-sm leading-7 text-white shadow-md shadow-violet-700/20">
                      {battleResults.prompt}
                    </div>
                  </div>

                  {isLoading && (
                    <div className="rounded-[28px] border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      Comparing responses and preparing the judge summary...
                    </div>
                  )}

                  {!isLoading && (
                    <>
                      <div className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                              Arena Output
                            </p>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                              Side-by-side model answers with judge review.
                            </p>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)] md:items-stretch">
                          <ModelCard
                            title={battleResults.model1.title}
                            score={battleResults.model1.score}
                            response={battleResults.model1.response}
                            isWinner={battleResults.model1.isWinner}
                          />

                          <div className="flex items-center justify-center py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                            VS
                          </div>

                          <ModelCard
                            title={battleResults.model2.title}
                            score={battleResults.model2.score}
                            response={battleResults.model2.response}
                            isWinner={battleResults.model2.isWinner}
                          />
                        </div>
                      </div>

                      <JudgePanel evaluation={battleResults.evaluation} />
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="sticky bottom-0 pb-4 pt-3">
            <div className="mx-auto w-full max-w-5xl">
              <PromptInput
                key={latestPrompt || 'empty-prompt'}
                onSubmit={handleStartBattle}
                isLoading={isLoading}
                initialPrompt={latestPrompt}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
