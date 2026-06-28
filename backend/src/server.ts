import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { boardRoutes } from './routes/board.routes'

const app = express()
const PORT = process.env.PORT ?? 3001

//Middlewares globais
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,               // necessário para enviar cookies
}))
app.use(express.json())
app.use(cookieParser())

//Rotas
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})
app.use('/boards', boardRoutes);

//Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})