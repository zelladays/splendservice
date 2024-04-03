"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileService = void 0;
const utils_1 = require("../../utils");
const services_1 = require("../../services");
const getProfile = async (userEmail) => {
    try {
        const user = await services_1.usersService.getUserByEmail(userEmail);
        const config = await services_1.userConfigService.getUserConfigById(user.user_config_id);
        if (!user || !config) {
            return null;
        }
        return utils_1.profileBuilder.buildProfile({ ...user, ...config });
    }
    catch (error) {
        console.error("Internal server error:", error);
        throw error;
    }
};
exports.profileService = {
    getProfile,
};
