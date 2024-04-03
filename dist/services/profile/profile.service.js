"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileService = void 0;
const builder_1 = require("../../builder");
const services_1 = require("../../services");
const getProfile = async (userEmail) => {
    try {
        const user = await services_1.usersService.getUserByEmail(userEmail);
        const config = await services_1.userConfigService.getUserConfigById(user.user_config_id);
        return builder_1.profileBuilder.buildProfile({ ...user, ...config });
    }
    catch (error) {
        console.error("Internal server error:", error);
        throw error;
    }
};
exports.profileService = {
    getProfile,
};
