/**
 * 从 IRCC ee_rounds JSON 推导订阅表单 stream 列表（CommonJS，供 server.js 与 Next API 共用）
 */
const FALLBACK = [
  'Provincial Nominee Program',
  'Federal Skilled Worker',
  'Canadian Experience Class',
  'Federal Skilled Trades',
  'French language proficiency',
  'STEM occupations',
  'Healthcare occupations',
  'Agriculture and agri-food occupations',
  'Transport occupations',
  'Trade occupations',
  'No Program Specified',
];

function normalizeDrawName(name) {
  return String(name || '').replace(/\(Version \d+\)/g, '').trim();
}

function mergeStreamLists(fromApi = [], fallback = []) {
  const map = new Map();
  for (const s of [...fallback, ...fromApi]) {
    const n = normalizeDrawName(s);
    if (!n) continue;
    const key = n.toLowerCase();
    if (!map.has(key)) map.set(key, n);
  }
  return [...map.values()].sort((a, b) => a.localeCompare(b));
}

/** @param {{ rounds?: Array<{ drawName?: string }> }} data */
function streamsPayloadFromIrccBody(data) {
  const rounds = data.rounds || [];
  const map = new Map();
  for (const round of rounds) {
    const n = normalizeDrawName(round.drawName);
    if (!n) continue;
    const key = n.toLowerCase();
    if (!map.has(key)) map.set(key, n);
  }
  const fromApi = [...map.values()];
  return mergeStreamLists(fromApi, FALLBACK);
}

module.exports = {
  FALLBACK,
  normalizeDrawName,
  mergeStreamLists,
  streamsPayloadFromIrccBody,
};
