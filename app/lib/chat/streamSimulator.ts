/**
 * Streaming text simulator — emits words progressively to mimic an LLM response.
 *
 * Design decisions:
 * - Uses setTimeout chains (NOT setInterval) for natural, jittery timing
 * - Emits 2-3 words per chunk for a realistic typing cadence
 * - Rich content cards appear 300ms after text finishes streaming
 * - Supports abort for cleanup when the user switches channels
 *
 * Usage:
 *   const sim = createStreamSimulator(script, onChunk, onRich, onComplete);
 *   sim.start();
 *   // later: sim.abort();
 */

import type { RichContent } from "~/types/chat";

export interface StreamScript {
  /** Milliseconds to wait before the first word appears (simulates "thinking"). */
  initialDelay: number;
  /** The full response text to stream word-by-word. */
  text: string;
  /** Optional rich content cards to reveal after text streaming completes. */
  richContent?: RichContent[];
}

export function createStreamSimulator(
  script: StreamScript,
  onChunk: (text: string) => void,
  onRichContent: (content: RichContent[]) => void,
  onComplete: () => void
): { start: () => void; abort: () => void } {
  let aborted = false;
  const timeouts: ReturnType<typeof setTimeout>[] = [];

  /** Schedule a timeout and track it so abort() can clear everything. */
  function schedule(fn: () => void, delay: number) {
    const id = setTimeout(() => {
      if (!aborted) fn();
    }, delay);
    timeouts.push(id);
  }

  function start() {
    const words = script.text.split(" ");
    let wordIndex = 0;
    let cumulativeDelay = script.initialDelay;

    /** Emit the next chunk of 2-3 words. */
    function emitNextChunk() {
      if (aborted || wordIndex >= words.length) return;

      // Grab 2-3 words per chunk for natural pacing
      const chunkSize = Math.random() > 0.5 ? 3 : 2;
      const chunk = words.slice(wordIndex, wordIndex + chunkSize);
      wordIndex += chunk.length;

      // Prepend space unless this is the very first chunk
      const prefix = wordIndex > chunk.length ? " " : "";
      onChunk(prefix + chunk.join(" "));

      if (wordIndex < words.length) {
        // Jittery delay: 30-60ms for natural feel
        const delay = 30 + Math.random() * 30;
        cumulativeDelay += delay;
        schedule(emitNextChunk, delay);
      } else {
        // Text complete — deliver rich content after a short pause
        if (script.richContent && script.richContent.length > 0) {
          schedule(() => {
            onRichContent(script.richContent!);
            onComplete();
          }, 300);
        } else {
          schedule(onComplete, 100);
        }
      }
    }

    // Start after the initial "thinking" delay
    schedule(emitNextChunk, script.initialDelay);
  }

  function abort() {
    aborted = true;
    timeouts.forEach(clearTimeout);
  }

  return { start, abort };
}
