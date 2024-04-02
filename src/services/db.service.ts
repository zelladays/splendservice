
import { connect, ResultIterator, ResultRecord, SSLMode } from 'ts-postgres';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.POSTGRES_URL,
  })

export default {
    query: async (text: string, params: any[]): Promise<ResultIterator<ResultRecord<any>>> => {
        return await pool.query(text, params) as any;
    }
};
