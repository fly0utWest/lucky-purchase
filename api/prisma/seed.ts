// prisma/seed.ts
import { prisma } from "../src/db/config";

async function main() {
  const categories = [
    {
      name: "Электроника",
      description: "Телефоны, планшеты и гаджеты",
    },
    {
      name: "Транспорт",
      description: "Автомобили и запчасти",
    },
    {
      name: "Для дома",
      description: "Мебель и интерьер",
    },
    {
      name: "Одежда",
      description: "Мужская и женская одежда",
    },
    {
      name: "Компьютеры",
      description: "Ноутбуки и комплектующие",
    },
    {
      name: "Детские товары",
      description: "Игрушки и детская одежда",
    },
    {
      name: "Спорт",
      description: "Спортивные товары",
    },
    {
      name: "Хобби",
      description: "Книги, музыка и развлечения",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log("Categories seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
