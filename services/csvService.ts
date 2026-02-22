import { ChunkPair } from "../types";

export const parseCSV = (csvContent: string): ChunkPair[] => {
  const lines = csvContent.split(/\r?\n/);
  const pairs: ChunkPair[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Simple CSV parser: looks for the first comma separator. 
    // Handles quoted strings loosely (e.g. "Japanese","English").
    // Fallback to simple split if regex fails or isn't needed.
    
    // Regex explanation: Match a field (quoted or unquoted), followed by a comma, followed by another field.
    // This is a simplified parser.
    const parts = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    
    let japanese = "";
    let english = "";

    if (line.includes(',')) {
      const firstCommaIndex = line.indexOf(',');
      japanese = line.substring(0, firstCommaIndex).trim();
      english = line.substring(firstCommaIndex + 1).trim();

      // Clean quotes if present (e.g. "Hello" -> Hello)
      if (japanese.startsWith('"') && japanese.endsWith('"')) {
        japanese = japanese.slice(1, -1);
      }
      if (english.startsWith('"') && english.endsWith('"')) {
        english = english.slice(1, -1);
      }
    } else {
      // Skip lines that don't have a separator
      continue;
    }

    if (japanese && english) {
      pairs.push({
        id: `csv-${i}-${Date.now()}`,
        japanese,
        english
      });
    }
  }

  return pairs;
};