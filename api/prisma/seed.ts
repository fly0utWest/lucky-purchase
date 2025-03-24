import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Массивы с возможными значениями
const adjectives = [
  "Магический",
  "Древний",
  "Таинственный",
  "Священный",
  "Проклятый",
  "Легендарный",
  "Мистический",
  "Божественный",
  "Драконий",
  "Эльфийский",
  "Гномий",
  "Демонический",
  "Ангельский",
  "Королевский",
  "Шаманский",
];

const items = [
  "Меч",
  "Посох",
  "Кольцо",
  "Амулет",
  "Броня",
  "Шлем",
  "Щит",
  "Перчатки",
  "Ботинки",
  "Плащ",
  "Свиток",
  "Зелье",
  "Кристалл",
  "Книга",
  "Жезл",
];

const materials = [
  "из адамантия",
  "из мифрила",
  "из обсидиана",
  "из рубина",
  "из сапфира",
  "из драконьей кости",
  "из лунного камня",
  "из звездного металла",
  "из эльфийского серебра",
  "из темной стали",
];

const effects = [
  "силы",
  "ловкости",
  "мудрости",
  "защиты",
  "скорости",
  "регенерации",
  "невидимости",
  "телепортации",
  "огня",
  "льда",
];

// Функции для генерации случайных данных
function getRandomElement(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateItemTitle(): string {
  return `${getRandomElement(adjectives)} ${getRandomElement(items)} ${getRandomElement(materials)}`;
}

function generateItemDescription(): string {
  return `Артефакт ${getRandomElement(effects)}, дарующий своему владельцу невероятную мощь. ${getRandomElement(adjectives).toLowerCase()} предмет, созданный ${getRandomElement(["древними магами", "эльфийскими мастерами", "гномьими кузнецами", "драконьими лордами", "небесными архитекторами"])}`;
}

function generateRandomPrice(): number {
  return Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
}

function generateRandomName(): string {
  const firstNames = [
    "Александр",
    "Михаил",
    "Дмитрий",
    "Артем",
    "Максим",
    "Даниил",
    "Иван",
    "Андрей",
    "Кирилл",
    "Никита",
  ];
  const lastNames = [
    "Иванов",
    "Смирнов",
    "Кузнецов",
    "Попов",
    "Васильев",
    "Петров",
    "Соколов",
    "Михайлов",
    "Новиков",
    "Федоров",
  ];
  return `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
}

function generateRandomLogin(): string {
  const prefixes = [
    "user",
    "gamer",
    "hero",
    "wizard",
    "warrior",
    "master",
    "player",
    "knight",
    "mage",
    "hunter",
  ];
  const suffix = Math.floor(Math.random() * 1000);
  return `${getRandomElement(prefixes)}${suffix}`;
}

async function main() {
  console.log("Начинаем заполнение базы данных...");

  // Создаем 100 пользователей
  const users = [];
  for (let i = 0; i < 100; i++) {
    const user = await prisma.user.create({
      data: {
        login: generateRandomLogin(),
        name: generateRandomName(),
        password: "123456", // В реальном приложении пароль должен быть захэширован
      },
    });
    users.push(user);
    if (i % 10 === 0) console.log(`Создано ${i + 1} пользователей`);
  }

  // Создаем 100 товаров
  for (let i = 0; i < 100; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    await prisma.item.create({
      data: {
        title: generateItemTitle(),
        description: generateItemDescription(),
        price: generateRandomPrice(),
        images: ["image1.png"],
        userId: randomUser.id,
      },
    });
    if (i % 10 === 0) console.log(`Создано ${i + 1} товаров`);
  }

  console.log("База данных успешно заполнена!");
}

main()
  .catch((e) => {
    console.error("Ошибка при заполнении базы данных:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
