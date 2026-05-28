import { Request, Response } from "express";
import * as productService from "../services/product.service";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { categoryId, search } = req.query;
    const products = await productService.getProducts({
      categoryId: categoryId as string,
      search: search as string,
    });
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
