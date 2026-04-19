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

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      'https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json',
      { cache: 'no-store' }
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
