import { Request, Response } from "express";
import {
  createItem,
  getItems,
  getItemById,
  upload,
  createItemWithImages,
} from "../services/item.service";
import { AppError } from "../utils/errors";
import asyncHandler from "../utils/asyncHandler";
import { CreateItemDTO, GetItemsDTO } from "../validators/item.validator";
import { removeItemById } from "../services/item.service";

export const uploadImageHandler = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new AppError("Файл не был загружен", 400);
    }

    console.log(
      `[УСПЕХ] Изображение загружено пользователем с id ${res.locals.userId}`
    );
    return res.status(200).json({ filename: req.file.filename });
  }
);

export const registerItemHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { ...validatedData }: CreateItemDTO = res.locals.validatedData;

    const newItem = await createItem({
      ...validatedData,
      userId: res.locals.userId,
    });

    console.log(
      `[УСПЕХ] Объявление добавлено пользователем с id ${res.locals.userId}`
    );
    return res.status(201).json({ ...newItem });
  }
);

export const getItemsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { limit, skip, sort }: GetItemsDTO = res.locals.validatedData;
    const items = await getItems({ limit, skip, sort });

    console.log(`[УСПЕХ] Было запрошено ${items.length} объявлений`);
    return res.status(200).json({ items, count: items.length });
  }
);

export const getItemByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = await getItemById(id);

    console.log(`[УСПЕХ] Запрошен товар с id ${id}`);
    return res.status(200).json(item);
  }
);

export const removeItemByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await removeItemById(id);

    console.log(`[УСПЕХ] удалено объявление с id ${id}`);
    return res.status(204).end();
  }
);

export const createItemWithImagesHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, price, categoryId } = req.body;
    const files = req.files as Express.Multer.File[];

    const validatedData = {
      title,
      description,
      price: Number(price),
      categoryId,
      images: files,
    };

    const newItem = await createItemWithImages(
      {
        ...validatedData,
        userId: res.locals.userId,
      },
      files
    );

    console.log(
      `[УСПЕХ] Объявление добавлено пользователем с id ${res.locals.userId}`
    );
    return res.status(201).json(newItem);
  }
);
