interface SubtitleEntry {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
}

// Helper function to convert SRT timestamp to seconds
function timestampToSeconds(timestamp: string): number {
  const [time, milliseconds] = timestamp.split(",");
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds + Number(milliseconds) / 1000;
}

export function parseSRT(srtContent: string): SubtitleEntry[] {
  const entries: SubtitleEntry[] = [];

  return entries;
}
