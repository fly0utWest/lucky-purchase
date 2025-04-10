import { prisma } from "../../config/db";
import { Prisma } from "@prisma/client";
import { SearchDTO } from "../validators/search.validator";

export async function getCategories() {
  return prisma.category.findMany();
}

export async function searchItem(params: SearchDTO) {
  const {
    query,
    sortBy,
    sortDirection,
    minPrice,
    maxPrice,
    categoryId,
    skip,
    take,
  } = params;

  const trimmedQuery = query.trim();
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

  let orderBy: Prisma.ItemOrderByWithRelationInput = {};

  switch (sortBy) {
    case "price":
      orderBy.price = sortDirection;
      break;
    case "title":
      orderBy.title = sortDirection;
      break;
    case "newest":
    default:
      orderBy.createdAt = sortDirection;
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

  return {
    items,
    pagination: {
      total,
      skip,
      take,
      hasMore: skip + take < total,
    },
  };
}
