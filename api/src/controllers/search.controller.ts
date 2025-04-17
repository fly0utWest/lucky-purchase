import asyncHandler from "../utils/asyncHandler";
import { getCategories, searchItems } from "../services/search.service";
import { SearchDTO } from "../validators/search.validator";

export const getCategoriesHandler = asyncHandler(async (req, res) => {
  const categories = await getCategories();

  return res.status(200).json(categories);
});

export const searchItemHandler = asyncHandler(async (req, res) => {
  const validatedData: SearchDTO = res.locals.validatedData;
  const searchResult = await searchItems(validatedData);
  return res.status(200).json(searchResult);
});
