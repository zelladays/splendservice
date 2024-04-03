import * as z from "zod";

const AddUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
});

export type User = z.infer<typeof AddUserSchema>;

export const parseUser = (data: unknown): User => {
    return AddUserSchema.parse(data);
};
