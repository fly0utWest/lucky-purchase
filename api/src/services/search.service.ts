import { prisma } from "../../config/db";

export async function getCategories() {
  return prisma.category.findMany();
}

export async function searchItem(query: string) {
  query.trim();
  const includedCategoryFields = { select: { name: true } };

  if (query === "") {
    return prisma.item.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { category: includedCategoryFields },
    });
  }

  return prisma.item.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          category: {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    include: { category: includedCategoryFields },
    orderBy: { createdAt: "desc" },
  });
}
