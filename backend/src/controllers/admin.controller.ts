import { Request, Response } from 'express'
import { AdminService } from '../services/admin.service'
import { GeminiService } from '../services/gemini.service'

const adminService = new AdminService()
const geminiService = new GeminiService()

export class AdminController {

  async getStatus(_req: Request, res: Response) {
    try {
      const settings = await adminService.getSettings()
      res.json({ isAIActive: settings.isAIActive })
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async setAI(req: Request, res: Response) {
    try {
      const { active } = req.body

      if (typeof active !== 'boolean') {
        res.status(400).json({ error: 'Campo "active" deve ser booleano' })
        return
      }

      const settings = await adminService.setAIActive(active)
      res.json({ isAIActive: settings.isAIActive })
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  // Botão manual do admin: gera uma rodada de posts da IA na thread.
  // Limitado ao nº de bots, então não roda indefinidamente.
  async gerarPosts(req: Request, res: Response) {
    try {
      const { threadId } = req.params as { threadId: string }

      const criados = await geminiService.gerarPostsNaThread(threadId)

      res.json({ success: true, postsCriados: criados })
    } catch (error) {
      res.status(500).json({ error: 'Erro ao gerar posts da IA' })
    }
  }
}
