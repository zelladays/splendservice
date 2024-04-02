import zod from 'zod'

const AddPotProgressSchema = zod.object({
    savingGoal: zod.number(),
    amountSavedPerInterval: zod.number(),
});

export type AddPotProgress = zod.infer<typeof AddPotProgressSchema>;

export const parseAddPotProgress = (potProgress: unknown) => {
    return AddPotProgressSchema.parse(potProgress);
};

const PotProgressSchema = zod.object({
    id: zod.string(),
    savingGoal: zod.number(),
    amountSavedPerInterval: zod.number(),
    currentAmount: zod.string(),
});

export type PotProgress = zod.infer<typeof PotProgressSchema>;

export const parsePotProgress = (potProgress: unknown) => {
    return PotProgressSchema.parse(potProgress);
};