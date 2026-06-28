import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { z } from 'zod';

const authService = new AuthService();

// validação
const createSchema = z.object({
  username: z.string().min(3, 'Username deve ter no mínimo 3 caracteres'),
  email: z.email('Email inválido'),
  password: z.string()
    .min(5, 'Senha deve ter no mínimo 5 caracteres')
    .regex(/[A-Z]/, 'Senha deve ter pelo menos 1 letra maiúscula')
    .regex(/[0-9]/, 'Senha deve ter pelo menos 1 número')
    .regex(/[^a-zA-Z0-9]/, 'Senha deve ter pelo menos 1 caractere especial'),
});

const loginSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
});

export class AuthController {

  async create(req: Request, res: Response) {
    try {
      const parsed = createSchema.safeParse(req.body)

      if (!parsed.success) {
        res.status(400).json({ error: parsed.error.issues[0]?.message })
        return
      }

      const { username, email, password } = parsed.data
      const user = await authService.create(username, email, password)

      res.status(201).json(user)
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Erro ao criar usuário'
      })
    }
  };

  async login(req: Request, res: Response) {
    try {
      const parsed = loginSchema.safeParse(req.body);

      if (!parsed.success) {
        res.status(400).json({ error: parsed.error.issues[0]?.message })
        return
      }

      const { email, password } = parsed.data;
      const resposta = await authService.login(email, password);

      // maxAge em ms — 5h para bater com o expiresIn do JWT
      res.cookie('token', resposta.token, {
        httpOnly: true,
        secure: false,     // true apenas quando tivermos o https
        sameSite: 'lax',
        maxAge: 5 * 60 * 60 * 1000,
      })

      res.json({ success: true })
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Erro ao fazer login'
      })
    }
  };

  async logout(req: Request, res: Response) {
  try {
    res.clearCookie('token')
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer logout' });
  }
};

}