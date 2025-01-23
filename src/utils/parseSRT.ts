interface SubtitleEntry {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
}

// Helper function to convert SRT timestamp to seconds
function timestampToSeconds(timestamp: string): number {
  const [time, milliseconds] = timestamp.split(',');
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds + Number(milliseconds) / 1000;
}

export function parseSRT(srtContent: string): SubtitleEntry[] {
  const entries: SubtitleEntry[] = [];
  const blocks = srtContent.trim().split('\n\n');

  for (const block of blocks) {
    const lines = block.split('\n');
    if (lines.length < 3) continue;

    const id = parseInt(lines[0]);
    const [startTimestamp, endTimestamp] = lines[1].split(' --> ');
    const text = lines.slice(2).join(' ').trim();

    entries.push({
      id,
      startTime: timestampToSeconds(startTimestamp),
      endTime: timestampToSeconds(endTimestamp),
      text
    });
  }

  return entries;
}
