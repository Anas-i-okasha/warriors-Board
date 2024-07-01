import { Router, Request, Response } from 'express';
import { Users } from '../controller/users';
import { TaskManagment } from '../controller/tasksManagment';
import { handleValidationErrors, validateUser, loginInfoValidation, saveTaskValidation } from '../shared/validation';
import { AuthGuard } from '../auth/auth';

const router: Router = Router();
const users = new Users();
const taskManagment = new TaskManagment();
const authGuard = new AuthGuard();


router.post('/login', loginInfoValidation, handleValidationErrors, (req: Request, res: Response) => users.login(req, res));
router.post('/register', validateUser, handleValidationErrors, (req: Request, res: Response) => users.register(req, res));

//Auth midleware
router.get('/getAllUsers', authGuard.loginRequired, async (req: Request, res: Response) => await users.getAllUsers(res));
router.get('/getUserRelatedTasks/:userId', authGuard.loginRequired, async (req: Request, res: Response) => await taskManagment.getUserRelatedTasks(req, res));

router.post('/createTask', authGuard.loginRequired, saveTaskValidation, handleValidationErrors, async (req: Request, res: Response) => await taskManagment.saveTask(req, res));
router.put('/updateTaskStatus/:id', authGuard.loginRequired, async (req: Request, res: Response) => await taskManagment.updateTaskStatus(req, res));
router.delete('/deleteTask/:id', authGuard.loginRequired, async (req: Request, res: Response) => await taskManagment.deleteTask(req, res));

export default router;
