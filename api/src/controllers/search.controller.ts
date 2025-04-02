import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";
import { getCategories } from "../services/search.service";

export const getCategoriesHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await getCategories();

    console.log("[УСПЕХ] Категории были запрошены");
    return res
      .status(200)
      .json({ categories: categories, count: categories.length });
  }
);
