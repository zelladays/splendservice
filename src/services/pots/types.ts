import zod from 'zod'

const AddPotSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    userId: zod.string(),
    savingGoal: zod.number(),
    amountSavedPerInterval: zod.number(),
});

export type AddPot = zod.infer<typeof AddPotSchema>;

export const parseAddPot = (pot: unknown) => {
    return AddPotSchema.parse(pot);
};

const PotSchema = zod.object({
    id: zod.string(),
    title: zod.string(),
    description: zod.string(),
    userId: zod.string(),
    potProgressId: zod.string(),
});

export type Pot = zod.infer<typeof PotSchema>;

export const mapPotToSchema = (pot: unknown) => {
    return PotSchema.parse(pot);
};