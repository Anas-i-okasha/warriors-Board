
import { Request, Response } from 'express';
import { Login, User } from '../shared/types';
import bcrypt from 'bcrypt';
import { BaseDAO } from '../baseDAO/baseDAO';
import jwt from 'jsonwebtoken';
import { AuthGuard } from '../auth/auth';

const baseDAO = new BaseDAO();
export class Controller {

    async login(req: Request, res: Response) {
        try {
            const userInfo: Login = req.body;
            const sql = `SELECT * FROM users WHERE email =$1`;
            const response = await baseDAO.executeQuery(sql, [userInfo.email]);
            if (!response?.length)
                return res.send({res: null, err: 'user not register!'});

            if (!await bcrypt.compare(userInfo.password, response[0].password))
                return res.send({res: null, err: 'error Authontication'});

            delete response[0].password
            return await new AuthGuard().handleLoginResponse(response[0], req, res);
        } catch(err) {
            console.error('Error login:', err);
            return res.status(500).json({ err: 'Internal server error' });
        } 
    }

    async register(req: Request, res: Response) {
        try {
            const user: User = req.body;
            let sql = 'SELECT count (1) from users WHERE email=$1';
            const response = await baseDAO.executeQuery(sql, [user.email]);

            const count = response?.length ? response[0].count : 0;
            if (count > 0)
                return res.send({ res: null, err: 'unique_violation_email' });
    
            sql = `INSERT Into users (first_name, last_name, email, password, is_admin)
                    VALUES ($1, $2, $3, $4, $5) RETURNING id`;

            const hashedPassword = await bcrypt.hash(user.password, parseInt(process.env.SALT as string, 10));
            const insertResponse = await baseDAO.executeQuery(sql, [
                user.first_name,
                user.last_name,
                user.email,
                hashedPassword,
                user.is_admin
            ]);
        
            const userId = insertResponse?.length ? insertResponse[0].id : 0;
            return res.send({ res: userId, err: null });
        } catch(err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ err: 'Internal server error' });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const sql = `SELECT * FROM users WHERE is_deleted = false`;
            const users = await baseDAO.executeQuery(sql, []);
            const response = users?.length? users : [];

            response.forEach((user) => {
                delete user.password;
            });

            res.send({res: response, err: null});
        } catch(err) {
            console.error('Error getAllUsers:', err);
            return res.status(500).json({ err: 'Internal server error' });
        }
    }

    async findUserById(userId: string) {
        try {
            const sql = `SELECT * FROM users where id=$1`;
            const userInfo = await baseDAO.executeQuery(sql, [userId]);
            return userInfo?.length? userInfo[0] : null;
        } catch(err) {
            console.error('Error getAllUsers:', err);
        }
    }

    saveTask(req: Request, res: Response) {
        try {

        } catch(err) {
            console.error('Error saveTask:', err);
            return res.status(500).json({ err: 'Internal server error' });
        }
    }

    updateTaskStatus(req: Request, res: Response) {

    }
}