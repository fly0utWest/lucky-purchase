import createStorage, { createUploader } from "./index";

const avatarStorage = createStorage("users/avatars");

const backgroundStorage = createStorage("users/backgrounds");

export const avatarUploader = createUploader(avatarStorage);

export const backgroundUploader = createUploader(backgroundStorage);
