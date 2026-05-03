import { useEffect, useMemo, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import bash from 'highlight.js/lib/languages/bash';

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

function parseResponse(response) {
  const blocks = [];
  const normalizedResponse = response.replace(/\r\n/g, '\n');
  const fencePattern = /```([\w-]+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match = fencePattern.exec(normalizedResponse);

  while (match) {
    if (match.index > lastIndex) {
      blocks.push({
        type: 'text',
        content: normalizedResponse.slice(lastIndex, match.index).trim(),
      });
    }

    blocks.push({
      type: 'code',
      language: match[1]?.toLowerCase() ?? '',
      content: match[2].trim(),
    });

    lastIndex = fencePattern.lastIndex;
    match = fencePattern.exec(response);
  }

  if (lastIndex < response.length) {
    blocks.push({
      type: 'text',
      content: normalizedResponse.slice(lastIndex).trim(),
    });
  }

  return blocks.filter((block) => block.content);
}

export default function SolutionContent({ response, title }) {
  const containerRef = useRef(null);
  const blocks = useMemo(() => parseResponse(response), [response]);

  useEffect(() => {
    const codeBlocks = containerRef.current?.querySelectorAll('pre code') ?? [];
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [blocks]);

  return (
    <div ref={containerRef} className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 md:max-h-[32rem]">
      {blocks.map((block, index) =>
        block.type === 'text' ? (
          <div
            key={`${title}-text-${index}`}
            className="solution-copy whitespace-pre-wrap break-words text-sm leading-7 text-slate-700 dark:text-white/88"
          >
            {block.content}
          </div>
        ) : (
          <div
            key={`${title}-code-${index}`}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 dark:border-white/10"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-black/70 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/45">
              <span>{block.language || 'code'}</span>
              <span>formatted</span>
            </div>
            <pre className="solution-code overflow-x-auto px-4 py-4 text-[13px] leading-6 text-slate-100">
              <code className={block.language ? `language-${block.language}` : undefined}>
                {block.content}
              </code>
            </pre>
          </div>
        ),
      )}
    </div>
  );
}
