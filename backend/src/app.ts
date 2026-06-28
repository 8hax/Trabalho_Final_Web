import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { boardRoutes } from './routes/board.routes';
import { authRoutes } from './routes/auth.routes';
import { authMiddleware } from './middleware/auth.middleware';
import { postsRoutes } from './routes/posts.routes';

const app = express();

//Middlewares globais

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,               // necessário para enviar cookies
}));

app.use(express.json());

app.use(cookieParser());

//Rotas

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
});

app.use('/boards', authMiddleware, boardRoutes);

app.use('/auth', authRoutes);

app.use('/posts', postsRoutes);

export default app;