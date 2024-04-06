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

const DBPotSchema = zod.object({
  id: zod.string(),
  title: zod.string(),
  description: zod.string(),
  pot_progress_id: zod.string(),
  collection_id: zod.string(),
  last_modified_timestamp: zod.number(),
  saving_goal: zod.number(),
  amount_saved_per_interval: zod.number(),
  current_amount: zod.number(),
});

export type DBPot = zod.infer<typeof DBPotSchema>;

export const mapDBPotToSchema = (pot: unknown) => {
  return DBPotSchema.parse(pot);
};

const PotSchema = zod.object({
  id: zod.string(),
  title: zod.string(),
  description: zod.string(),
  potProgressId: zod.string(),
  collectionId: zod.string(),
  lastModifiedTimestamp: zod.number(),
  savingGoal: zod.number(),
  amountSavedPerInterval: zod.number(),
  currentAmountSaved: zod.number(),
});

export type Pot = zod.infer<typeof PotSchema>;

export const potMapper = {
  from: (pot: DBPot): Pot => {
    return {
      id: pot.id,
      title: pot.title,
      description: pot.description,
      potProgressId: pot.pot_progress_id,
      collectionId: pot.collection_id,
      lastModifiedTimestamp: pot.last_modified_timestamp,
      savingGoal: pot.saving_goal,
      amountSavedPerInterval: pot.amount_saved_per_interval,
      currentAmountSaved: pot.current_amount,
    };
  },
  to: (pot: Pot): DBPot => {
    return {
      id: pot.id,
      title: pot.title,
      description: pot.description,
      pot_progress_id: pot.potProgressId,
      collection_id: pot.collectionId,
      last_modified_timestamp: pot.lastModifiedTimestamp,
      saving_goal: pot.savingGoal,
      amount_saved_per_interval: pot.amountSavedPerInterval,
      current_amount: pot.currentAmountSaved,
    };
  },
};

export const mapPotToSchema = (pot: unknown) => {
  return PotSchema.parse(pot);
};
