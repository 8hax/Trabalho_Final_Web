import { ThreadController } from "../controllers/thread.controller";
import { Router } from "express";

const router = Router();
const threadController = new ThreadController();

router.get('/:id', (req, res) => threadController.findById(req, res));

export { router as threadRoutes }