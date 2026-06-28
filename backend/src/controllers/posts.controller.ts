import { Request, Response } from 'express'
import { PostsServices } from '../services/posts.service'

const postsServices = new PostsServices()

export class PostsController {

  async create(req: Request, res: Response) {
    try {
      const { content, threadId, imageUrl } = req.body
      const { id: authorId } = res.locals.user

      const post = await postsServices.create(content, threadId, authorId, imageUrl)

      res.status(201).json(post)
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Erro ao criar post'
      })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id: postId } = req.params as {id: string}
      const { id: authorId, isAdmin } = res.locals.user

      await postsServices.delete(postId, authorId, isAdmin)

      res.json({ success: true })
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Erro ao deletar post'
      })
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params as {id: string}
      const post = await postsServices.findById(id)

      if (!post) {
        res.status(404).json({ error: 'Post não encontrado' })
        return
      }

      res.json(post)
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async findAllByThread(req: Request, res: Response) {
    try {
      const { threadId } = req.params as {threadId: string}
      const posts = await postsServices.findAllByThread(threadId)

      res.json(posts)
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async findPostsByUser(req: Request, res: Response) {
    try {
      const { id: userId } = res.locals.user
      const posts = await postsServices.findPostsByUser(userId)

      res.json(posts)
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

}