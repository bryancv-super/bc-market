import { Router } from "express";
import * as listController from "../controllers/list.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/", listController.getLists);
router.post("/", listController.createList);
router.get("/:id", listController.getListById);
router.patch("/:id", listController.updateList);
router.delete("/:id", listController.deleteList);

router.post("/items", listController.addProduct);
router.patch("/items/:id", listController.toggleItem);
router.delete("/items/:id", listController.removeItem);

export default router;
