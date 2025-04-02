import { prisma } from "../db/config";

export async function getCategories() {
return prisma.category.findMany();
}