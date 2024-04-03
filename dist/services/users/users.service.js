"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const userConfig_1 = require("../userConfig");
const db_service_1 = __importDefault(require("../../configs/db.service"));
const types_1 = require("./types");
const uuid_1 = require("uuid");
async function createUser(user) {
    try {
        const userId = (0, uuid_1.v4)();
        const { configId } = await userConfig_1.userConfigService.addNewUserConfig();
        await db_service_1.default.query("INSERT INTO users (id, name, email, user_config_id) VALUES ($1, $2, $3, $4)", [userId, user.name, user.email.toLowerCase(), configId]);
        return { userId };
    }
    catch (error) {
        console.error("Error adding new user:", error);
        throw error;
    }
}
async function getUserByEmail(userEmail) {
    try {
        const user = await db_service_1.default.query('SELECT * FROM "users" WHERE email = $1', [
            userEmail,
        ]);
        return types_1.userMapper.from(user.rows[0]);
    }
    catch (error) {
        console.error("Error retrieving user:", error);
        throw error;
    }
}
async function getAllUsers() {
    try {
        const users = await db_service_1.default.query("SELECT * FROM users", []);
        return users.rows;
    }
    catch (error) {
        console.error("Error retrieving users:", error);
        throw error;
    }
}
exports.usersService = {
    createUser,
    getUserByEmail,
    getAllUsers,
};
