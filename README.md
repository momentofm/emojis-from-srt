# Emojis from SRT

A TypeScript-based API service that generates relevant emojis for subtitle text using Google's Gemini LLM. The service processes SRT (SubRip Subtitle) files and returns emoji suggestions for each subtitle entry.

## Project Goal

This project aims to enhance subtitle files by automatically suggesting relevant emojis that capture the mood and content of each subtitle entry. This can be useful for:
- Adding emotional context to subtitles
- Making subtitles more engaging
- Automating emoji suggestions for content creators

## File Structure

```
emojis-from-srt/
├── src/
│   ├── index.ts              # Main application entry point
│   ├── routes/
│   │   └── emojiRoutes.ts    # API route handlers
│   └── utils/
│       ├── callLLM.ts        # LLM integration for emoji generation
│       └── parseSRT.ts       # SRT file parsing utilities
├── .env                      # Environment variables (not in git)
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── test.srt                 # Sample SRT file for testing
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Google Gemini API key:
   ```
   LLM_API_KEY=your_api_key_here
   LLM_MODEL_NAME=gemini-1.5-flash
   ```

## Development

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm start
```

## Testing the API

You can test the API using curl:

```bash
curl -X POST \
  http://localhost:3000/api/process-srt \
  -H 'Content-Type: multipart/form-data' \
  -F 'srtFile=@./test.srt'
```

Example response:
```json
[
  {
    "text": "Hello! Welcome to our exciting video!",
    "emojis": ["👋", "🎉", "📹"],
    "startTime": 1,
    "endTime": 4
  },
  {
    "text": "Today we're going to learn something amazing.",
    "emojis": ["📚", "✨", "🎯"],
    "startTime": 4.5,
    "endTime": 7
  }
]
```

## API Response Format

Each subtitle entry in the response includes:
- `text`: The original subtitle text
- `emojis`: Array of suggested emojis
- `startTime`: Start time in seconds
- `endTime`: End time in seconds
