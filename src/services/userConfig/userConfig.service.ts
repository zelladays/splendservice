import db from '../db.service';
import { v4 } from 'uuid';
import { AddConfig, Config } from './types';

async function addNewUserConfig(config?: AddConfig) {
    try {
        const configId = v4();
        await db.query('INSERT INTO user_config (id, saving_interval) VALUES ($1, $2)',
            [configId, "month"]);
        return { configId };
    }
    catch (error) {
        console.error('Error adding new config:', error);
        throw error;
    }
}

async function updateUserConfig(config: Config) {
    try {
        const result = await db.query('UPDATE user_config SET saving_interval = $1, current_savings = $2, lifetime_savings = $3, saving_interval_amount = $4 WHERE id = $5',
            [config.savingsInterval, config.currentSavings, config.lifetimeSavings, config.savingAmountInterval, config.id]);
        return result.rows[0];
    }
    catch (error) {
        console.error('Error updating config:', error);
        throw error;
    }
}

async function getUserConfigById(configId: string) {
    try {
        const config = await db.query('SELECT * FROM user_config WHERE id = $1', [configId]);
        return config.rows[0] as Config;
    } catch (error) {
        console.error('Error retrieving config:', error);
        throw error;
    }
}

async function getAllUserConfigs() {
    try {
        const config = await db.query('SELECT * FROM user_config', []);
        return config.rows as Config[];
    } catch (error) {
        console.error('Error retrieving config:', error);
        throw error;
    }
}

export const userConfigService = {
    addNewUserConfig,
    updateUserConfig,
    getUserConfigById,
    getAllUserConfigs
}