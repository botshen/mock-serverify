import { Storage } from "@plasmohq/storage"

export const storageConfig = {
  key: "mock_genius_projects",
  instance: new Storage({
    area: "local",
    copiedKeyList: ["mock_genius_projects"]
  })
}
export const storageCurrentConfig = {
  key: "mockgenius_current_project",
  instance: new Storage({
    area: "local",
    copiedKeyList: ["mockgenius_current_project"]
  })
}
export const storageLogsConfig = {
  key: "mockgenius_logs",
  instance: new Storage({
    area: "local",
    copiedKeyList: ["mockgenius_logs"]
  })
}
export const defaultValueFunction = (v) => v ?? []
export const defaultLogsFunction = (v) => v ?? []

export const defaultCurrent = (v) => v ?? "http://localhost:5173"
