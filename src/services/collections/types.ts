import zod from "zod";

export const Collection = zod.object({
    id: zod.string(),
    name: zod.string(),
    userId: zod.string(),
});

export type Collection = zod.infer<typeof Collection>;

export const AddCollection = zod.object({
    name: zod.string(),
    userId: zod.string(),
});

export type AddCollection = zod.infer<typeof AddCollection>;

export const parseAddCollection = (collection: unknown) => {
    return AddCollection.safeParse(collection);
};
