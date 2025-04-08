import createStorage, { createUploader } from "./index";

const itemStorage = createStorage("items");
const itemUploader = createUploader(itemStorage);

export default itemUploader;
