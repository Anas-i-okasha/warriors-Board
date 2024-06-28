import express from "express";
import session  from 'express-session';
import { BaseDAO } from "./baseDAO/baseDAO";
import { AuthGuard } from "./auth/auth";
import dotenv from "dotenv";
import  router  from "./route/route";
dotenv.config();
const authGuard = new AuthGuard();

(async () => {
    const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
    await new BaseDAO().connectionDB(); // Ensure the database is connected
    const app = express();
    app.use(express.json());

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
