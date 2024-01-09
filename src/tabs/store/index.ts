import { Storage } from "@plasmohq/storage"

import {
  AJAX_INTERCEPTOR_CURRENT_PROJECT,
  AJAX_INTERCEPTOR_PROJECTS,
  AJAX_INTERCEPTOR_SETTINGS
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

export const storageSettings = {
  key: AJAX_INTERCEPTOR_SETTINGS,
  instance: new Storage({
    area: "local",
    copiedKeyList: [AJAX_INTERCEPTOR_SETTINGS]
  })
}

export const defaultValueFunction = (v) => v ?? []
export const defaultCurrent = (v: string) => v ?? ""
export const defaultSettings = (v) =>
  v ?? {
    terminalLog: true,
    toastLog: true,
    transmission: false,
    globalSwitch: true
  }
