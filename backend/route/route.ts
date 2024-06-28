import { Router, Request, Response } from 'express';
import { Users } from '../controller/users';
import { TaskManagment } from '../controller/tasksManagment';
import { handleValidationErrors, validateUser, loginInfoValidation, saveTaskValidation } from '../shared/validation';
import { AuthGuard } from '../auth/auth';

const router: Router = Router();
const users = new Users();
const taskManagment = new TaskManagment();
const authGuard = new AuthGuard();

//Auth
router.post('/login', loginInfoValidation, handleValidationErrors, (req: Request, res: Response) => users.login(req, res));
router.post('/register', validateUser, handleValidationErrors, (req: Request, res: Response) => users.register(req, res));


router.get('/getAllUsers', authGuard.loginRequired, (req: Request, res: Response) => users.getAllUsers(res));
router.get('/getUserRelatedTasks', authGuard.loginRequired, handleValidationErrors, (req: Request, res: Response) => taskManagment.getUserRelatedTasks(req, res));

router.post('/saveTask', authGuard.loginRequired, saveTaskValidation, handleValidationErrors, (req: Request, res: Response) => taskManagment.saveTask(req, res));
router.put('/updateTaskStatus/:id', authGuard.loginRequired, (req: Request, res: Response) => taskManagment.updateTaskStatus(req, res));
router.delete('/deleteTask/:id', authGuard.loginRequired, (req: Request, res: Response) => taskManagment.deleteTask(req, res));

export default router;
