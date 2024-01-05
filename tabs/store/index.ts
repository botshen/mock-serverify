import { Storage } from "@plasmohq/storage"

import {
  AJAX_INTERCEPTOR_CURRENT_PROJECT,
  AJAX_INTERCEPTOR_PROJECTS
} from "~util/const"

export const storageConfig = {
  key: AJAX_INTERCEPTOR_PROJECTS,
  instance: new Storage({
    area: "local",
    copiedKeyList: [AJAX_INTERCEPTOR_PROJECTS]
  })
}
export const storageCurrentConfig = {
  key: AJAX_INTERCEPTOR_CURRENT_PROJECT,
  instance: new Storage({
    area: "local",
    copiedKeyList: [AJAX_INTERCEPTOR_CURRENT_PROJECT]
  })
}

export const defaultValueFunction = (v) => v ?? []
export const defaultCurrent = (v) => v ?? "http://localhost:5173"
