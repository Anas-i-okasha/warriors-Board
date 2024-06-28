// src/routes/api.ts
import { Router, Request, Response } from 'express';
import { Controller } from '../controller/controller';
import { handleValidationErrors, validateUser, loginInfoValidation } from '../shared/validation';
import { AuthGuard } from '../auth/auth';
const router: Router = Router();
const apiController = new Controller();
const authGuard = new AuthGuard();

router.post('/login',loginInfoValidation, handleValidationErrors, (req: Request, res: Response) => apiController.login(req, res));
router.post('/register', validateUser, handleValidationErrors, (req: Request, res: Response) => apiController.register(req, res));
router.get('/getAllUsers', authGuard.loginRequired, (req, res) => apiController.getAllUsers(req, res));
router.post('/saveTask', authGuard.loginRequired, (req, res) => apiController.saveTask(req, res));
router.put('/updateTaskStatus', authGuard.loginRequired, (req, res) => apiController.updateTaskStatus(req, res));

export default router;
