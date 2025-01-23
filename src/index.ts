import { config } from 'dotenv';
config();

import express, { Express } from 'express';
import cors from 'cors';
import emojiRoutes from './routes/emojiRoutes.js';

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', emojiRoutes);

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
