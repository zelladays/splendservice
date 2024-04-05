import zod from "zod";

const AddPotSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  userId: zod.string(),
  savingGoal: zod.number(),
  amountSavedPerInterval: zod.number(),
});

export type AddPot = zod.infer<typeof AddPotSchema>;

const UpdatePotSchema = zod.object({
  id: zod.string(),
  title: zod.string(),
  description: zod.string(),
  userId: zod.string(),
  potProgressId: zod.string(),
  savingGoal: zod.number(),
  amountSavedPerInterval: zod.number(),
});

export type UpdatePot = zod.infer<typeof UpdatePotSchema>;

export const parseUpdatePot = (pot: unknown) => {
  return UpdatePotSchema.safeParse(pot);
};

export const parseAddPot = (pot: unknown) => {
  return AddPotSchema.safeParse(pot);
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
