/**
 * Stored in Subscriber.selectedPrograms when the user wants every EE round type,
 * including streams IRCC adds in the future (no manual list update needed server-side).
 * Must stay in sync with server.js ALL_STREAMS_TOKEN literal.
 */
export const ALL_STREAMS_TOKEN = '__ALL_EXPRESS_ENTRY_STREAMS__';

export function normalizeDrawName(name) {
  return String(name || '').replace(/\(Version \d+\)/g, '').trim();
}

/** Dedupe case-insensitively; keep first-seen casing */
export function mergeStreamLists(fromApi = [], fallback = []) {
  const map = new Map();
  for (const s of [...fallback, ...fromApi]) {
    const n = normalizeDrawName(s);
    if (!n) continue;
    const key = n.toLowerCase();
    if (!map.has(key)) map.set(key, n);
  }
  return [...map.values()].sort((a, b) => a.localeCompare(b));
}
