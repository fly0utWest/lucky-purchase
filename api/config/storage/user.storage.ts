import createStorage, { createUploader } from "./index";

const avatarStorage = createStorage("users/avatars");

const backgroundStorage = createStorage("users/backgrounds");

export const avatarUpload = createUploader(avatarStorage, 2 * 1024 * 1024, [
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export const backgroundUpload = createUploader(
  backgroundStorage,
  5 * 1024 * 1024,
  ["image/jpeg", "image/png", "image/webp"]
);
