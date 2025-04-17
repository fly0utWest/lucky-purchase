import { Item } from "@prisma/client";
import { CreateItemSchema } from "../validators/item.validator";

export interface AuthResponse {
  token: string;
}

export interface ToggleFavoriteResponse {
  createdAt: Date;
  userId: string;
  itemId: string;
  action: "add" | "remove";
}

export interface GetUserFavoritesResponse {
  items: Item[];
  count: number;
}

export interface IsFavoritedResponse {
  isFavorited: boolean;
}

export interface CreateItemResponse {
  item: Item;
}

export interface AppErrorResponse {
  error: string;
}

export interface ValidationErrorResponse {
  message: string;
  errors: Array<{
    path: string;
    text: string;
  }>;
}

export interface PrismaErrorResponse {
  message: string;
  errors: any;
}

export interface ServerErrorResponse {
  error: string;
}

export type SuccessResponse =
  | AuthResponse
  | ToggleFavoriteResponse
  | GetUserFavoritesResponse
  | IsFavoritedResponse
  | CreateItemResponse;

export type ErrorResponse =
  | AppErrorResponse
  | ValidationErrorResponse
  | PrismaErrorResponse
  | ServerErrorResponse;
export type ApiResponse = SuccessResponse | ErrorResponse;
