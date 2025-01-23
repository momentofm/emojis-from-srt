import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import { parseSRT } from '../utils/parseSRT.js';
import { getEmojiSuggestions } from '../utils/callLLM.js';

const router: Router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

interface EmojiResponse {
  text: string;
  emojis: string[];
  startTime: number;
  endTime: number;
}

router.post('/process-srt', upload.single('srtFile'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No SRT file provided' });
      return;
    }

    const srtContent = req.file.buffer.toString();
    const subtitles = parseSRT(srtContent);

    // Process all subtitles in parallel
    const results: EmojiResponse[] = await Promise.all(
      subtitles.map(async (subtitle) => {
        const emojis = await getEmojiSuggestions(subtitle.text);
        return {
          text: subtitle.text,
          emojis,
          startTime: subtitle.startTime,
          endTime: subtitle.endTime
        };
      })
    );

    res.json(results);
  } catch (error) {
    console.error('Error processing SRT file:', error);
    res.status(500).json({ error: 'Error processing SRT file' });
  }
});

export default router;
