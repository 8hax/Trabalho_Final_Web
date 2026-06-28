import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma'
import bcrypt from 'bcryptjs'

export class AuthService {

  async create(username: string, email: string, password: string) {
    const isUserCreated = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }]
      }
    })

    if (isUserCreated) {
      throw new Error('Username ou email já cadastrado')
    }

    const passwordHashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { username, email, password: passwordHashed }
    })

    return { id: user.id, email: user.email }
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Bloqueia se não encontrou ou se é um bot
    if (!user || user.isAI) {
      throw new Error('Dados inválidos')
    }

    // Bloqueia se não tem senha (segurança extra)
    if (!user.password) {
      throw new Error('Dados inválidos')
    }

    const senhaMatch = await bcrypt.compare(password, user.password)

    if (!senhaMatch) {
      throw new Error('Dados inválidos')
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.isAdmin },
      process.env.JWT_SECRET!,
      { expiresIn: '5h' }
    )

    return { token }
  }

}