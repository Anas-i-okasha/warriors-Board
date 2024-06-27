// src/routes/api.ts
import { Router, Request, Response } from 'express';
import { Controller } from '../controller/controller';
import { handleValidationErrors, validateUser } from '../shared/validation';
const router: Router = Router();
const apiController = new Controller();

router.post('/login', (req, res) => apiController.login(req, res));
router.post('/register', validateUser, handleValidationErrors, (req: Request, res: Response) => apiController.register(req, res));
router.get('/getAllUsers', (req, res) => apiController.getAllUsers(req, res));
router.post('/saveTask', (req, res) => apiController.saveTask(req, res));
router.put('/updateTaskStatus', (req, res) => apiController.updateTaskStatus(req, res));

export default router;
