import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";
import { getCategories, searchItem } from "../services/search.service";
import { SearchDTO } from "../validators/search.validator";

export const getCategoriesHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await getCategories();

    console.log("[УСПЕХ] Категории были запрошены");
    return res
      .status(200)
      .json({ categories: categories, count: categories.length });
  }
);

export const searchItemHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { query }: SearchDTO = res.locals.validatedData;
    const foundItems = await searchItem(query);
    const count = foundItems.length;
    console.log(
      `[ИНФО] ${query.length > 0 ? `По запросу ${query} было найдено ${count} объявлений` : "Был выполнен поиск без запроса"}`
    );
    return res.status(200).json({ items: foundItems, count });
  }
);
