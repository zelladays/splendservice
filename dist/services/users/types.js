"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMapper = exports.parseUser = exports.parseAddUser = void 0;
const z = __importStar(require("zod"));
const AddUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
});
const parseAddUser = (data) => {
    return AddUserSchema.safeParse(data);
};
exports.parseAddUser = parseAddUser;
const DBUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.union([
        z.literal("SUPER_ADMIN"),
        z.literal("ADMIN"),
        z.literal("USER"),
    ]),
    user_config_id: z.string(),
});
const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.union([
        z.literal("SUPER_ADMIN"),
        z.literal("ADMIN"),
        z.literal("USER"),
    ]),
    userConfigId: z.string(),
});
const parseUser = (data) => {
    return UserSchema.safeParse(data);
};
exports.parseUser = parseUser;
exports.userMapper = {
    from: (user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        userConfigId: user.user_config_id,
    }),
    to: (user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        user_config_id: user.userConfigId,
    }),
};
