import { normalizeDrawName, mergeStreamLists } from '@/constants/subscription';

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

/** 与常见浏览器一致，降低 IRCC / CDN 对数据中心 IP 的拒绝率（prod serverless 常见；local 往往不受影响） */
const IRCC_FETCH_INIT = {
  cache: 'no-store',
  headers: {
    Accept: 'application/json,text/plain,*/*',
    'Accept-Language': 'en-CA,en;q=0.9',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    Referer: 'https://www.canada.ca/',
  },
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  res.setHeader('Cache-Control', 'no-store, must-revalidate');

  try {
    const response = await fetch(
      'https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json',
      IRCC_FETCH_INIT
    );
    if (!response.ok) {
      throw new Error(`IRCC HTTP ${response.status}`);
    }
    const data = await response.json();
    const rounds = data.rounds || [];
    const map = new Map();
    for (const round of rounds) {
      const n = normalizeDrawName(round.drawName);
      if (!n) continue;
      const key = n.toLowerCase();
      if (!map.has(key)) map.set(key, n);
    }
    const fromApi = [...map.values()];
    const streams = mergeStreamLists(fromApi, FALLBACK);
    return res.status(200).json({ streams, source: 'ircc' });
  } catch (e) {
    console.error('ircc-streams:', e.message);
    return res.status(200).json({
      streams: mergeStreamLists([], FALLBACK),
      source: 'fallback',
      error: e.message,
    });
  }
}
