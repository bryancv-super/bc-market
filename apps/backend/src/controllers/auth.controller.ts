import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export const signup = async (req: Request, res: Response) => {
 try {
 const result = await authService.registerUser(req.body);
 res.status(201).json(result);
 } catch (error: any) {
 res.status(400).json({ message: error.message });
 }
};

export const login = async (req: Request, res: Response) => {
 try {
 const result = await authService.loginUser(req.body);
 res.status(200).json(result);
 } catch (error: any) {
 res.status(400).json({ message: error.message });
 }
};

export const me = async (req: AuthRequest, res: Response) => {
 try {
 if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
 const user = await authService.getCurrentUser(req.userId);
 res.status(200).json(user);
 } catch (error: any) {
 res.status(404).json({ message: error.message });
 }
};

export const updateMe = async (req: AuthRequest, res: Response) => {
 try {
 if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
 const user = await authService.updateCurrentUser(req.userId, req.body);
 res.status(200).json(user);
 } catch (error: any) {
 res.status(400).json({ message: error.message });
 }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
 try {
 if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
 const { currentPassword, newPassword } = req.body;
 const result = await authService.changeCurrentUserPassword(req.userId, currentPassword, newPassword);
 res.status(200).json(result);
 } catch (error: any) {
 res.status(400).json({ message: error.message });
 }
};
