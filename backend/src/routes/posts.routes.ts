import { Router } from 'express'
import { PostsController } from '../controllers/posts.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()
const postsController = new PostsController()

// todas as rotas de posts requerem login!!!
router.use(authMiddleware)

router.post('/', (req, res) => postsController.create(req, res))
router.delete('/:id', (req, res) => postsController.delete(req, res))
router.get('/user', (req, res) => postsController.findPostsByUser(req, res))
router.get('/thread/:threadId', (req, res) => postsController.findAllByThread(req, res))
router.get('/:id', (req, res) => postsController.findById(req, res))

export { router as postsRoutes }