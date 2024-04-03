import { profileBuilder } from "../../utils";
import { usersService, userConfigService } from "../../services";

const getProfile = async (userEmail: string) => {
  try {
    const user = await usersService.getUserByEmail(userEmail);
    const config = await userConfigService.getUserConfigById(user.userConfigId);

    if (!user || !config) {
      return null;
    }

    return profileBuilder.buildProfile(user, config);
  } catch (error) {
    console.error("Internal server error:", error);
    throw error;
  }
};

export const profileService = {
  getProfile,
};
