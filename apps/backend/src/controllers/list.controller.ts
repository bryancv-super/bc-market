import { Request, Response } from "express";
import * as listService from "../services/list.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export const createList = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userId = (req as AuthRequest).userId!;
    const list = await listService.createShoppingList(userId, name);
    res.status(201).json(list);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getLists = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).userId!;
    const lists = await listService.getUserShoppingLists(userId);
    res.status(200).json(lists);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getListById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const list = await listService.getShoppingListById(id);
    if (!list) return res.status(404).json({ message: "List not found" });
    res.status(200).json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as AuthRequest).userId!;
    const list = await listService.updateShoppingList(id, userId, req.body);
    res.status(200).json(list);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as AuthRequest).userId!;
    await listService.deleteShoppingList(id, userId);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { listId, productId, quantity } = req.body;
    const item = await listService.addProductToList(listId, productId, quantity);
    res.status(201).json(item);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const toggleItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await listService.toggleItemChecked(id);
    res.status(200).json(item);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const removeItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await listService.removeItemFromList(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
