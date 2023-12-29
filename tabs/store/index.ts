import { Storage } from "@plasmohq/storage"

export const storageConfig = {
  key: "mock_genius_projects",
  instance: new Storage({
    area: "local",
    copiedKeyList: ["mock_genius_projects"]
  })
}
export const defaultValueFunction = (v) => v ?? []
