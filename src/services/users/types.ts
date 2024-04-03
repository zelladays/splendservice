import * as z from "zod";

const AddUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type AddUser = z.infer<typeof AddUserSchema>;

export const parseAddUser = (data: unknown) => {
  return AddUserSchema.safeParse(data);
};

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

export type DBUser = z.infer<typeof DBUserSchema>;

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

export type User = z.infer<typeof UserSchema>;

export const parseUser = (data: unknown) => {
  return UserSchema.safeParse(data);
};

export const userMapper = {
  from: (user: DBUser): User => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    userConfigId: user.user_config_id,
  }),
  to: (user: User): DBUser => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    user_config_id: user.userConfigId,
  }),
};
