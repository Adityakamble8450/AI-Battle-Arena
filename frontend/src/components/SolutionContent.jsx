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
  const fencePattern = /```([\w-]+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match = fencePattern.exec(response);

  while (match) {
    if (match.index > lastIndex) {
      blocks.push({
        type: 'text',
        content: response.slice(lastIndex, match.index).trim(),
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
      content: response.slice(lastIndex).trim(),
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
    <div ref={containerRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 md:max-h-[28rem]">
      {blocks.map((block, index) =>
        block.type === 'text' ? (
          <div
            key={`${title}-text-${index}`}
            className="solution-copy whitespace-pre-wrap break-words text-sm leading-7 text-slate-700 dark:text-slate-200"
          >
            {block.content}
          </div>
        ) : (
          <pre
            key={`${title}-code-${index}`}
            className="solution-code overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 px-4 py-3 text-sm leading-6 dark:border-slate-700"
          >
            <code className={block.language ? `language-${block.language}` : undefined}>
              {block.content}
            </code>
          </pre>
        ),
      )}
    </div>
  );
}
