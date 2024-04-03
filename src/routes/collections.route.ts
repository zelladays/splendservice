import { collectionsController } from "../controllers";
import { Router } from "express";

const router = Router();

router.get(
    "/collection/:collectionId",
    collectionsController.getCollectionById
);
router.get("/collection/:userId", collectionsController.getCollectionByUserId);

router.delete(
    "/collection/:collectionId",
    collectionsController.deleteCollectionById
);

export const collectionsRouter = router;
