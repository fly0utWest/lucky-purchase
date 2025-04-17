import { createItem, getItems, getItemById } from "../services/item.service";
import asyncHandler from "../utils/asyncHandler";
import { CreateItemDTO, GetItemsDTO } from "../validators/item.validator";
import { removeItemById } from "../services/item.service";
import { UUIDDTO } from "../validators/shared.validator";

export const createItemHandler = asyncHandler(async (req, res) => {
  const { ...validatedData }: CreateItemDTO = res.locals.validatedData;

  const newItem = await createItem({
    ...validatedData,
    userId: res.locals.userId,
  });

  return res.status(201).json(newItem);
});

export const getItemsHandler = asyncHandler(async (req, res) => {
  const { limit, skip, sort, userId }: GetItemsDTO = res.locals.validatedData;
  const result = await getItems({ limit, skip, sort, userId });

  return res.status(200).json(result);
});

export const getItemByIdHandler = asyncHandler(async (req, res) => {
  const { id }: UUIDDTO = res.locals.validatedData;
  const item = await getItemById(id);

  return res.status(200).json(item);
});

export const removeItemByIdHandler = asyncHandler(async (req, res) => {
  const { id }: UUIDDTO = res.locals.validatedData;
  await removeItemById(id);

  return res.status(204).end();
});
