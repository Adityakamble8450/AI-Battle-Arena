import { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import bash from 'highlight.js/lib/languages/bash';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);

function normalizeMarkdownResponse(response) {
  return (response || '').replace(/\r\n/g, '\n').trim();
}

function InlineCode({ children }) {
  return (
    <code className="rounded-lg bg-slate-200 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-900 dark:bg-white/10 dark:text-white">
      {children}
    </code>
  );
}

function CodeBlock({ language, children }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);
  const code = String(children).replace(/\n$/, '');

  useEffect(() => {
    if (!codeRef.current) {
      return;
    }

    hljs.highlightElement(codeRef.current);
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#050816] shadow-[0_0_0_1px_rgba(148,163,184,0.08)]">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/90 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-emerald-400 p-1 opacity-70" />
          <span className="rounded-full bg-amber-400 p-1 opacity-70" />
          <span className="rounded-full bg-rose-400 p-1 opacity-70" />
          <span className="ml-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            {language || 'code'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 transition hover:bg-white/10"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <pre className="solution-code max-h-[24rem] overflow-auto px-4 py-4 text-[13px] leading-6 text-slate-100">
        <code ref={codeRef} className={language ? `language-${language}` : undefined}>
          {code}
        </code>
      </pre>
    </div>
  );
}

export default function SolutionContent({ response }) {
  const contentRef = useRef(null);
  const markdown = useMemo(() => normalizeMarkdownResponse(response), [response]);

  useEffect(() => {
    const codeBlocks = contentRef.current?.querySelectorAll('pre code') ?? [];
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [markdown]);

  return (
    <div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto p-4">
      <div className="solution-markdown prose prose-slate max-w-none text-sm dark:prose-invert">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="mb-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="mb-3 mt-6 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mb-3 mt-5 text-base font-semibold text-slate-900 dark:text-white">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-white/88">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="mb-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-white/88">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-white/88">
                {children}
              </ol>
            ),
            li: ({ children }) => <li>{children}</li>,
            strong: ({ children }) => (
              <strong className="font-semibold text-slate-950 dark:text-white">{children}</strong>
            ),
            code(props) {
              const { inline, className, children } = props;
              const match = /language-([\w-]+)/.exec(className || '');
              const language = match?.[1] || '';

              if (inline) {
                return <InlineCode>{children}</InlineCode>;
              }

              return <CodeBlock language={language}>{children}</CodeBlock>;
            },
            pre: ({ children }) => children,
            blockquote: ({ children }) => (
              <blockquote className="mb-4 rounded-r-2xl border-l-4 border-emerald-500 bg-emerald-500/5 px-4 py-3 text-sm leading-7 text-slate-700 dark:text-white/82">
                {children}
              </blockquote>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
