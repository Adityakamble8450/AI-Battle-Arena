import { useEffect, useState } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import ModelCard from './components/ModelCard';
import JudgePanel from './components/JudgePanel';

const JUDGE_CRITERIA = [
  { name: 'Accuracy' },
  { name: 'Clarity' },
  { name: 'Completeness' },
];

function mapBattleResult(apiResult, prompt) {
  const model1Won = apiResult.winner === 'solution_1';

  return {
    prompt,
    model1: {
      title: 'Model 1',
      score: apiResult.solution_1_score ?? 0,
      response: apiResult.solution_1 ?? '',
      isWinner: model1Won,
    },
    model2: {
      title: 'Model 2',
      score: apiResult.solution_2_score ?? 0,
      response: apiResult.solution_2 ?? '',
      isWinner: !model1Won,
    },
    evaluation: {
      winner: model1Won ? 'Model 1' : 'Model 2',
      loser: model1Won ? 'Model 2' : 'Model 1',
      totalScore1: apiResult.solution_1_score ?? 0,
      totalScore2: apiResult.solution_2_score ?? 0,
      criteria: JUDGE_CRITERIA.map((item) => ({
        ...item,
        model1: apiResult.solution_1_score ?? 0,
        model2: apiResult.solution_2_score ?? 0,
      })),
      reasoning: model1Won
        ? apiResult.solution_1_recommendation ?? ''
        : apiResult.solution_2_recommendation ?? '',
      feedback: model1Won
        ? apiResult.solution_2_recommendation ?? ''
        : apiResult.solution_1_recommendation ?? '',
    },
  };
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = window.localStorage.getItem('clashmind-theme');
    if (storedTheme) {
      return storedTheme === 'dark';
    }

    return true;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [battleResults, setBattleResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
    window.localStorage.setItem('clashmind-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((current) => !current);

  const handleStartBattle = async (prompt) => {
    setIsLoading(true);
    setErrorMessage('');
    setBattleResults({ prompt });

    try {
      const response = await fetch('/invoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: prompt }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Failed to compare responses.');
      }

      setBattleResults(mapBattleResult(payload, prompt));
    } catch (error) {
      setBattleResults({ prompt });
      setErrorMessage(error.message || 'Something went wrong while calling the API.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors duration-200 dark:bg-black dark:text-white">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 overflow-hidden">
        <section className="mx-auto flex h-full w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
          <div className="flex-1 overflow-y-auto py-5">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
              {!battleResults?.prompt && !isLoading && (
                <div className="flex min-h-[48vh] flex-col items-center justify-center rounded-[32px] border border-dashed border-slate-200 bg-white px-6 py-10 text-center shadow-sm dark:border-white/10 dark:bg-neutral-950">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-white/45">
                    Battle Chat
                  </p>
                  <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    Type a prompt below and the model comparison will appear here.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-white/65">
                    Ask for code, explanations, or both. Responses render as normal text, and fenced code blocks are shown in a dedicated editor-style panel.
                  </p>
                </div>
              )}

              {battleResults?.prompt && (
                <>
                  <div className="flex justify-end">
                    <div className="max-w-3xl rounded-[28px] rounded-br-md border border-slate-200 bg-slate-100 px-5 py-4 text-sm leading-7 text-slate-900 shadow-sm dark:border-white/10 dark:bg-white dark:text-black">
                      {battleResults.prompt}
                    </div>
                  </div>

                  {isLoading && (
                    <div className="rounded-[28px] border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500 shadow-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white/70">
                      Comparing responses and preparing the judge summary...
                    </div>
                  )}

                  {errorMessage && !isLoading && (
                    <div className="rounded-[28px] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-100">
                      {errorMessage}
                    </div>
                  )}

                  {!isLoading && battleResults?.model1 && battleResults?.model2 && (
                    <>
                      <div className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-neutral-950">
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-white/45">
                              Arena Output
                            </p>
                            <p className="mt-1 text-sm text-slate-600 dark:text-white/65">
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

                          <div className="flex items-center justify-center py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-white/30">
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
              <PromptInput onSubmit={handleStartBattle} isLoading={isLoading} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
