import express from "express";
import session  from 'express-session';
import cookieParser  from "cookie-parser";
import { BaseDAO } from "./baseDAO/baseDAO";
import { AuthGuard } from "./auth/auth";
import dotenv from "dotenv";
import router  from "./route/route";
import cors  from 'cors';
dotenv.config();
const authGuard = new AuthGuard();
const PORT: number = parseInt(process.env.PORT as string, 10) || 4000;

(async () => {
    await new BaseDAO().connectionDB(); // Ensure the database is connected
    const app = express();
    app.use(cookieParser());
    app.use(express.json());
    app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
  }));

    app.use(session({
        secret: 'classified',
        resave: false,
        saveUninitialized: true,
        cookie: {
          path: '/',
          httpOnly: true,
          maxAge: 7*24*1000 // in milliseconds
        }
    }));

    app.use(authGuard.requestHandler); // middelware request handler
    app.use(router); // router middleWare
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
    return app;
})();
