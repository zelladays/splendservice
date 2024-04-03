import * as z from "zod";

const AddUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type AddUser = z.infer<typeof AddUserSchema>;

export const parseAddUser = (data: unknown) => {
  return AddUserSchema.safeParse(data);
};

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  user_config_id: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const parseUser = (data: unknown) => {
  return UserSchema.safeParse(data);
};
