import { prisma } from "../../config/db";
import { Prisma } from "@prisma/client";
import { SearchDTO } from "../validators/search.validator";

export async function getCategories() {
  return prisma.category.findMany();
}

export async function searchItem(params: SearchDTO) {
  const {
    query: encodedQuery,
    sortBy,
    sortDirection,
    minPrice,
    maxPrice,
    categoryId,
    skip,
    take,
  } = params;

  let query = encodedQuery;
  query = decodeURIComponent(encodedQuery);

  const trimmedQuery = query.trim();
  console.log("Поисковый запрос после декодирования:", trimmedQuery);

  const includedCategoryFields = { select: { id: true, name: true } };
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

  if (categoryId) {
    whereClause.categoryId = categoryId;
  }

  console.log("Параметры запроса:", {
    trimmedQuery,
    minPrice,
    maxPrice,
    categoryId,
    whereClause,
  });

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

  try {
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

    console.log(`Найдено ${items.length} из ${total} элементов`);

    return {
      items,
      pagination: {
        total,
        skip,
        take,
        hasMore: skip + take < total,
      },
    };
  } catch (error) {
    console.error("Ошибка при выполнении поискового запроса:", error);
    throw error;
  }
}
