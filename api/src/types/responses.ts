import { Item, User, Category } from "@prisma/client";

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

export interface GetItemsResponse {
  items: Item[];
  count: number;
}
type UserSelect = {
  id: true;
  name: true;
  createdAt: true;
  avatar: true;
};

type CategorySelect = {
  id: true;
  name: true;
};

type SelectedUser = Pick<User, keyof UserSelect>;
type SelectedCategory = Pick<Category, keyof CategorySelect>;

export interface GetItemByIdResponse extends Omit<Item, "user" | "category"> {
  user: SelectedUser;
  category: SelectedCategory;
}

export interface GetCategoriesResponse {
  categories: Category[];
  count: number;
}

interface Pagination {
  total: number;
  skip: number;
  take: number;
  hasMore: boolean;
}

type CategorySearchSelecction = Pick<Category, "name">;

interface SearchItemSelecton extends Omit<Item, "category"> {
  category: CategorySearchSelecction;
}

export interface SearchItemsResponse {
  items: SearchItemSelecton[];
  pagination?: Pagination;
  count: number;
}

// Error responses
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
  | CreateItemResponse
  | GetItemsResponse
  | GetItemByIdResponse
  | GetCategoriesResponse
  | SearchItemsResponse;

export type ErrorResponse =
  | AppErrorResponse
  | ValidationErrorResponse
  | PrismaErrorResponse
  | ServerErrorResponse;

export type ApiResponse = SuccessResponse | ErrorResponse;
