/**
 * Real, client-side OCR via Tesseract.js (WASM, runs entirely in the browser —
 * nothing is uploaded). Used to scan screenshots for a likely transaction
 * reference so the citizen doesn't have to retype it by hand under stress.
 */
export async function extractText(file: File): Promise<string> {
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker("eng");
  try {
    const {
      data: { text }
    } = await worker.recognize(file);
    return text;
  } finally {
    await worker.terminate();
  }
}

const referencePattern = /\b\d{9,18}\b/g;

/** UTRs/reference numbers are long digit runs — prefer the longest match found. */
export function findLikelyReference(text: string): string | undefined {
  const matches = text.match(referencePattern);
  if (!matches || matches.length === 0) return undefined;
  return [...matches].sort((a, b) => b.length - a.length)[0];
}
