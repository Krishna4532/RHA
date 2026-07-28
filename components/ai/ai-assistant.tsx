"use client";

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Copy, RotateCcw, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createAssistantReply, type AssistantMessage, type AssistantReply } from '@/lib/assistant';

const initialMessages: AssistantMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: 'I’m here to guide visitors through the movement with calm, precise answers. Ask me about the mission, the campaign, or how to get involved.',
    createdAt: new Date().toISOString(),
    citations: ['Movement overview', 'Community values'],
  },
];

const suggestionPrompts = [
  'About the Movement',
  'Why Reservation Removal?',
  'Latest Campaigns',
  'How can I contribute?',
  'Official Statements',
];

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function renderMarkdown(content: string) {
  const blocks = content.split(/\n{2,}/).filter(Boolean);

  return blocks.map((block, blockIndex) => {
    if (block.startsWith('```')) {
      const code = block.replace(/```[a-z]*\n?/, '').replace(/```$/, '').trim();
      return (
        <pre key={`code-${blockIndex}`} className="overflow-x-auto rounded-[1rem] border border-border/70 bg-background-soft p-4 text-sm leading-7 text-foreground">
          <code>{code}</code>
        </pre>
      );
    }

    if (block.includes('|')) {
      const rows = block
        .split('\n')
        .map((row) => row.trim())
        .filter(Boolean);
      if (rows.length >= 2 && rows[1].includes('---')) {
        const tableRows = rows.map((row) => row.split('|').map((cell) => cell.trim()).filter(Boolean));
        return (
          <div key={`table-${blockIndex}`} className="overflow-hidden rounded-[1rem] border border-border/70">
            <table className="min-w-full border-collapse text-sm">
              <tbody>
                {tableRows.map((row, rowIndex) => (
                  <tr key={`${row.join('-')}-${rowIndex}`} className={rowIndex === 0 ? 'bg-background-soft' : 'bg-white'}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${cell}-${cellIndex}`} className="border-b border-border/70 px-3 py-2 text-foreground-soft">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }

    const lines = block.split('\n');
    const isList = lines.every((line) => /^([-*] |\d+\. )/.test(line));
    if (isList) {
      const listType = lines[0].startsWith('-') || lines[0].startsWith('*') ? 'ul' : 'ol';
      return (
        <div key={`list-${blockIndex}`} className="space-y-2">
          {listType === 'ul' ? (
            <ul className="ml-5 list-disc space-y-2 text-sm leading-7 text-foreground-soft">
              {lines.map((line, lineIndex) => (
                <li key={`${line}-${lineIndex}`}>{renderInline(line.replace(/^([-*] )/, ''))}</li>
              ))}
            </ul>
          ) : (
            <ol className="ml-5 list-decimal space-y-2 text-sm leading-7 text-foreground-soft">
              {lines.map((line, lineIndex) => (
                <li key={`${line}-${lineIndex}`}>{renderInline(line.replace(/^\d+\. /, ''))}</li>
              ))}
            </ol>
          )}
        </div>
      );
    }

    return <p key={`paragraph-${blockIndex}`} className="text-sm leading-7 text-foreground-soft">{renderInline(block)}</p>;
  });
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^\)]+\))/g).filter(Boolean);

  return parts.map((part, index) => {
    if (/^\*\*.*\*\*$/.test(part)) {
      return <strong key={`${part}-${index}`}>{part.replace(/\*\*/g, '')}</strong>;
    }
    if (/^\*.*\*$/.test(part)) {
      return <em key={`${part}-${index}`}>{part.replace(/\*/g, '')}</em>;
    }
    if (/^`.*`$/.test(part)) {
      return (
        <code key={`${part}-${index}`} className="rounded bg-background-soft px-1.5 py-0.5 text-[0.92em] text-foreground">
          {part.replace(/`/g, '')}
        </code>
      );
    }
    if (/^\[[^\]]+\]\([^\)]+\)$/.test(part)) {
      const match = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
      if (match) {
        return (
          <a key={`${part}-${index}`} href={match[2]} className="text-accent underline-offset-2 transition hover:underline">
            {match[1]}
          </a>
        );
      }
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export function AIAssistant() {
  const [messages, setMessages] = useState<AssistantMessage[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pendingInput, setPendingInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const showSuggestions = useMemo(() => !isGenerating && messages.length <= 1, [isGenerating, messages.length]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [messages, isGenerating, prefersReducedMotion]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`;
    }
  }, [draft]);

  async function sendMessage(input: string, retry = false) {
    const trimmed = input.trim();
    if (!trimmed || isGenerating) return;

    setError(null);
    setIsGenerating(true);
    setPendingInput(trimmed);

    const userMessage: AssistantMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setDraft('');

    const assistantReply = createAssistantReply(trimmed);
    const assistantId = `${Date.now()}-assistant`;

    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: 'assistant',
        content: '',
        createdAt: new Date().toISOString(),
        citations: assistantReply.citations,
      },
    ]);

    try {
      if (!navigator.onLine) {
        throw new Error('Network unavailable. Please check your connection and try again.');
      }

      const words = assistantReply.content.split(/(\s+)/);
      let streamedContent = '';

      for (const word of words) {
        streamedContent += word;
        setMessages((prev) => prev.map((message) => (message.id === assistantId ? { ...message, content: streamedContent } : message)));
        await wait(prefersReducedMotion ? 10 : 28);
      }

      setMessages((prev) => prev.map((message) => (message.id === assistantId ? { ...message, content: assistantReply.content, citations: assistantReply.citations } : message)));
    } catch (err) {
      setMessages((prev) => prev.filter((message) => message.id !== assistantId));
      setError(err instanceof Error ? err.message : 'The assistant could not respond right now.');
    } finally {
      setIsGenerating(false);
      setPendingInput('');
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await sendMessage(draft);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(draft);
    }
  }

  async function copyMessage(messageId: string) {
    const message = messages.find((entry) => entry.id === messageId);
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedId(messageId);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      setError('Copy failed. Please try again.');
    }
  }

  function clearConversation() {
    setMessages(initialMessages);
    setDraft('');
    setError(null);
    setCopiedId(null);
  }

  return (
    <div className="mx-auto w-full max-w-5xl rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-[0_30px_90px_-34px_rgba(17,17,17,0.28)] backdrop-blur-xl sm:p-8">
      <div className="rounded-[1.8rem] border border-border/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(250,250,248,0.95)_100%)] p-4 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Movement Assistant</p>
              <p className="text-sm text-foreground-soft">Online · Ready to help</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={clearConversation} className="gap-2 rounded-full">
            <RotateCcw className="h-4 w-4" />
            Clear conversation
          </Button>
        </div>

        <div className="mt-5 max-h-[60vh] space-y-4 overflow-y-auto rounded-[1.25rem] bg-background-soft/70 p-3 shadow-inner sm:p-4" role="log" aria-live="polite">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[90%] rounded-[1.25rem] border border-border/70 px-4 py-3 shadow-sm sm:max-w-[82%] ${message.role === 'assistant' ? 'bg-white text-foreground' : 'bg-[linear-gradient(135deg,#111111_0%,#3a3a3a_100%)] text-white'}`}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className={`text-[0.7rem] font-semibold uppercase tracking-[0.24em] ${message.role === 'assistant' ? 'text-foreground-soft' : 'text-white/80'}`}>
                      {message.role === 'assistant' ? 'Assistant' : 'You'}
                    </span>
                    {message.role === 'assistant' ? (
                      <button
                        type="button"
                        aria-label="Copy response"
                        onClick={() => void copyMessage(message.id)}
                        className="rounded-full p-1.5 transition hover:bg-background-soft"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>
                  <div className="space-y-3">
                    {message.content ? renderMarkdown(message.content) : <p className="text-sm leading-7 text-foreground-soft">Generating response…</p>}
                  </div>
                  {message.role === 'assistant' && message.citations && message.citations.length > 0 ? (
                    <div className="mt-4 rounded-[1rem] border border-border/70 bg-background-soft/70 p-3">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-foreground-soft">Sources</p>
                      <ul className="mt-2 space-y-1 text-sm text-foreground-soft">
                        {message.citations.map((citation) => (
                          <li key={citation}>• {citation}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isGenerating ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="max-w-[85%] rounded-[1.25rem] border border-border/70 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2 text-sm text-foreground-soft">
                  <span className="font-medium">Assistant is typing</span>
                  <span className="inline-flex gap-1">
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }} className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }} className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                </div>
              </div>
            </motion.div>
          ) : null}

          {error ? (
            <div className="rounded-[1.2rem] border border-accent/20 bg-accent/10 p-4 text-sm text-foreground">
              <p className="font-medium">{error}</p>
              <Button variant="secondary" size="sm" className="mt-3" onClick={() => void sendMessage(pendingInput || draft)}>
                Retry
              </Button>
            </div>
          ) : null}

          <div ref={endRef} />
        </div>

        {showSuggestions ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestionPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  setDraft(prompt);
                  textareaRef.current?.focus();
                }}
                className="rounded-full border border-border bg-background-soft px-3 py-2 text-sm text-foreground-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                {prompt}
              </button>
            ))}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="sticky bottom-0 mt-4 rounded-[1.25rem] border border-border/80 bg-white/90 p-3 shadow-sm backdrop-blur">
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask about the movement"
              aria-label="Message the assistant"
              className="min-h-[46px] flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm leading-7 text-foreground outline-none placeholder:text-foreground-soft"
              disabled={isGenerating}
            />
            <Button type="submit" className="h-11 shrink-0 gap-2 rounded-full" disabled={isGenerating || !draft.trim()}>
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
          <p className="mt-2 px-2 text-xs text-foreground-soft">
            Press Enter to send. Press Shift + Enter for a new line.
          </p>
        </form>
      </div>
    </div>
  );
}
