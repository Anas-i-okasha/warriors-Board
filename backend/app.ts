import express from "express";
import { BaseDAO } from "./baseDAO/baseDAO";
import { requestHandler } from "./auth/auth";
import dotenv from "dotenv";
import  router  from "./route/route";
dotenv.config();

(async () => {
    const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
    await new BaseDAO().connectionDB(); // Ensure the database is connected
    const app = express();
    app.use(express.json());

    app.use(requestHandler); // middelware request handler
    app.use(router); // router middleWare
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
    return app;
})();
