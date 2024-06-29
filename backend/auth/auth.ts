import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JwtObject, SessionInfo, User } from "../shared/types";
import { Users } from "../controller/users";
const users = new Users();

export class AuthGuard {

    async loginRequired(req: Request, res: Response, next: NextFunction) {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        if (!token)
            return res.status(401).send({err: '401 Bad Authorization!'});

        try {
            const payload = new AuthGuard().verifyJwt(token);
            const userInfo = await users.findUserById(payload.userId);
            if(!userInfo)
                return res.status(404).send({res: null, err: 'user not exist'});

            if (!req.session.user)
                req.session.user = userInfo;
        } catch(err) {
            console.error('loginRequired:', err);
            return res.send({err: 'Bad Token!'});
        }
        next();
    }

    requestHandler: RequestHandler = (req, res, next) => {
        console.log(`New Request--> Path: ${req.path} ------- Body: ${JSON.stringify(req.body)}`);
        next();
    }

    async handleLoginResponse(loginResult: SessionInfo, req: Request, res: Response) {
        try {
            const token = jwt.sign({ userId: loginResult.id, email: loginResult.email }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
            res.cookie('live-connected-id', token, {maxAge: 7*27*3600*1000});

            return res.status(200).send({res: loginResult, err: null});
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
            console.error('Missing JwT secret key');
            return process.exit(1);
        }
        return secretKey;
    }
}
