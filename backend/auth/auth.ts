import { ErrorRequestHandler, RequestHandler, Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JwtObject, SessionInfo, User } from "../shared/types";
import { Controller } from "../controller/controller";
const controller = new Controller();

export class AuthGuard {

    async loginRequired(req: Request, res: Response, next: NextFunction) {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        if (!token)
            return res.send({err: '401 Bad Authorization!'});

        try {
            const payload = new AuthGuard().verifyJwt(token);
            const userInfo = await controller.findUserById(payload.userId);
            if(!userInfo)
                return res.send({res: null, err: 'user not exist'});
        } catch(err) {
            console.error('loginRequired:', err);
            return res.status(401).send({err: 'Bad Token!'});
        }

        next();
    }

    requestHandler: RequestHandler = (req, res, next) => {
        console.log(`New Request--> Path: ${req.path} ------- Body: ${JSON.stringify(req.body)}`);
        next();
    }

    customError: ErrorRequestHandler = (err, req, res, next) => {
        console.log('uncaught excepetion', err);
        res.status(500).send(err);
    }


    extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async handleLoginResponse(loginResult: SessionInfo, req: Request, res: Response) {
        try {
            const token = jwt.sign({ userId: loginResult.id, email: loginResult.email }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
            res.cookie('session-user-id', token, { httpOnly: true });
            req.session.user = JSON.parse(JSON.stringify(loginResult));
    
            return res.send({res: loginResult, err: null});
        } catch(err) {
            console.error('handleLoginResponse', err);
        }
    }

    verifyJwt(token: string): JwtObject {
        return jwt.verify(token, this.getJwtSecretKey()) as JwtObject;
    }

    getJwtSecretKey() {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            console.error('Missing JwT secret key')
            return process.exit(1)
        }
        return secretKey;
    }
}
