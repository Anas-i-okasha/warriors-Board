import pg, { Pool }  from 'pg';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import firebaseService from './firebase-key.json';
dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert(firebaseService as admin.ServiceAccount)
});

export class BaseDAO {
    private pool: Pool;
    
    constructor() {
        this.pool = new pg.Pool({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432', 10),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    }

    public async connectionDB() {
        try {
            await this.pool.connect();
            console.log('Database connected successfully.');
        } catch (error: any) {
            console.error('Failed to connect to the database:', error.message);
            process.exit(1); // Exit process with failure
        }
    };

    public async executeQuery(query: string, bindValues: any[]) {
      try {
        const pool = this.pool;
        const result = await pool.query(query, bindValues);
        return result.rows || [];
      } catch(ex) {
        console.log('executeQuery:', ex);
      }
    }
}

export { admin };

