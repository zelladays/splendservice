import { userConfigService } from '../userConfig';
import db from '../db.service';
import { User } from './types';
import { v4 } from 'uuid';

async function createUser(user: User) {
    try {
        const userId = v4();
        const { configId } = await userConfigService.addNewUserConfig();
        await db.query('INSERT INTO users (id, name, email, user_config_id) VALUES ($1, $2, $3, $4)', [userId, user.name, user.email.toLowerCase(), configId]);
        return { userId };
    }
    catch (error) {
        console.error('Error adding new user:', error);
        throw error;
    }
}

async function getUserByEmail(userEmail: string) {
    try {
        const user = await db.query('SELECT * FROM "users" WHERE email = $1', [userEmail]);
        return user.rows[0] as User;
    }
    catch (error) {
        console.error('Error retrieving user:', error);
        throw error;
    }
}

async function getAllUsers() {
    try {
        const users = await db.query('SELECT * FROM users', []);
        return users.rows as User[];
    }
    catch (error) {
        console.error('Error retrieving users:', error);
        throw error;
    }
}

export const userApplication = {
    createUser,
    getUserByEmail,
    getAllUsers
}