import { prisma } from "../../config/db";
import { Prisma } from "@prisma/client";
import { SearchDTO } from "../validators/search.validator";
import { GetCategoriesResponse, SearchItemsResponse } from "../types/responses";

export async function getCategories(): Promise<GetCategoriesResponse> {
  const categories = await prisma.category.findMany();

  console.log("[УСПЕХ] Категории были запрошены");
  return { categories, count: categories.length };
}

export async function searchItems(
  params: SearchDTO,
  includePagination: boolean = false
): Promise<SearchItemsResponse> {
  const {
    query: encodedQuery,
    sortBy,
    minPrice,
    maxPrice,
    category: encodedCategory,
    skip,
    take,
  } = params;

  let category;
  let query = encodedQuery;
  query = decodeURIComponent(encodedQuery);

  const trimmedQuery = query.trim();
  console.log(
    `[ИНФО] ${trimmedQuery.length > 0 ? `Поисковый запрос: ${trimmedQuery}` : "Был выполнен поиск недавних объявлений"}`
  );

  const includedCategoryFields = { select: { name: true } };
  const whereClause: Prisma.ItemWhereInput = {};

  if (trimmedQuery !== "") {
    whereClause.OR = [
      {
        title: {
          contains: trimmedQuery,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: trimmedQuery,
          mode: "insensitive",
        },
      },
      {
        category: {
          name: {
            contains: trimmedQuery,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    whereClause.price = {};
    if (minPrice !== undefined) {
      whereClause.price.gte = minPrice;
    }
    if (maxPrice !== undefined) {
      whereClause.price.lte = maxPrice;
    }
  }

  if (encodedCategory) {
    category = encodedCategory;
    category = decodeURIComponent(encodedCategory);
    whereClause.category = { name: category };
  }

  let orderBy: Prisma.ItemOrderByWithRelationInput = {};
  switch (sortBy) {
    case "expensive":
      orderBy = { price: "desc" };
      break;
    case "cheap":
      orderBy = { price: "asc" };
      break;
    case "newest":
      orderBy = { createdAt: "desc" };
      break;
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    default:
      orderBy = { createdAt: "desc" };
      break;
  }

  const items = await prisma.item.findMany({
    where: whereClause,
    include: { category: includedCategoryFields },
    orderBy,
    skip,
    take,
  });

  const total = await prisma.item.count({
    where: whereClause,
  });

  return includePagination
    ? {
        items,
        pagination: {
          total,
          skip,
          take,
          hasMore: skip + take < total,
        },
        count: items.length,
      }
    : { items, count: items.length };
}
