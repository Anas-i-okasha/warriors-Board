import { Request, Response } from 'express';
import { Task } from '../shared/types';
import { admin } from '../baseDAO/baseDAO';

const fireStore = admin.firestore();

export class TaskManagment {
    async getUserRelatedTasks(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            if (!userId)
                return {err: 'user not uxist!'};

            const snapshot = await fireStore.collection('tasks').where('userId', '==', +userId).get();
            if (snapshot.empty)
                return res.send([]);

            const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.send(users);
        } catch(err) {
            console.error('getUserRelatedTasks:', err);
        }
    }

    async saveTask(req: Request, res: Response) {
        try {
            const task: Task = req.body;
            if (!Object.keys(task).length)
                return res.send({res: null, err: 'invalid input'});

            const response = await fireStore.collection('tasks').doc().set(task);
            res.send(response);
        } catch(err) {
            console.error('Error saveTask:', err);
            return res.status(500).json({ err: 'Internal server error' });
        }
    }

    async updateTaskStatus(req: Request, res: Response) {
        try {
            const taskID = req.body.id;
            const updated = await fireStore.collection('tasks').doc(taskID).update({
                status: req.body.status
            });
            res.send(updated);
        } catch(err) {
            console.error('Error updateTaskStatus:', err);
            return res.status(500).json({ err: 'Internal server error' });
        }
    }

    async getTaskById(req: Request, res: Response) {
        try {
            const taskId = req.params.id;
            const taskInfo = await fireStore.collection('tasks').doc(taskId).get();
            return taskInfo.data();
        } catch(err) {
            console.error('Error getTaskById:', err);
            return res.status(500).json({ err: 'Internal server error' });
        }
    }

    async deleteTask(req: Request, res: Response) {
        try {
            const taskId = req.params.id;
           const taskInfo =  await this.getTaskById(req, res);
           if (!taskInfo)
               return res.send({err: 'task not exist!'});

           const response = await fireStore.collection('tasks').doc(taskId).delete();
           return res.send(response);
        } catch(err) {
            console.error('Error deleteTask:', err);
            return res.status(500).json({ err: 'Internal server error' });
        }
    }
}