import Browser from "webextension-polyfill"

import { Storage } from "@plasmohq/storage"

import {
  AJAX_INTERCEPTOR_CURRENT_PROJECT,
  AJAX_INTERCEPTOR_GLOBAL_SETTING,
  AJAX_INTERCEPTOR_PROJECTS,
  CUSTOM_EVENT_NAME
} from "../util/const"
import { injectScriptToPage, setGlobalData } from "../util/utils"

const storage = new Storage({
  area: "local",
  copiedKeyList: [AJAX_INTERCEPTOR_CURRENT_PROJECT, AJAX_INTERCEPTOR_PROJECTS]
})
;(async () => {
  const { origin } = location
  const currentNameUrl = await storage.get(AJAX_INTERCEPTOR_CURRENT_PROJECT)
  if (origin === currentNameUrl) {
    injectScriptToPage()
    setGlobalData()
  }
})()

window.addEventListener(
  CUSTOM_EVENT_NAME,
  async (event) => {
    if (Browser.runtime?.id) {
      try {
        const customEvent = event as CustomEvent
        const currentNameUrl = await storage.get(
          AJAX_INTERCEPTOR_CURRENT_PROJECT
        )
        const { origin } = location

        if (customEvent.detail && origin === currentNameUrl) {
          await Browser.runtime.sendMessage({
            type: "ajaxInterceptor",
            data: customEvent.detail
          })
        }
      } catch (error) {}
    }
  },
  false
)
const setMockData = async () => {
  const { origin } = location
  const currentUrl = await storage.get(AJAX_INTERCEPTOR_CURRENT_PROJECT)
  if (origin === currentUrl) {
    injectScriptToPage()
    setGlobalData()
  }
}
storage.watch({
  [AJAX_INTERCEPTOR_PROJECTS]: async (c) => {
    if (c.newValue === undefined) {
      storage.set(AJAX_INTERCEPTOR_PROJECTS, [])
    }
    setMockData()
  },
  [AJAX_INTERCEPTOR_CURRENT_PROJECT]: async (c) => {
    if (c.newValue === undefined) {
      storage.set(AJAX_INTERCEPTOR_CURRENT_PROJECT, "")
    }
    setMockData()
  },
  [AJAX_INTERCEPTOR_GLOBAL_SETTING]: async (c) => {
    if (c.newValue === undefined) {
      storage.set(AJAX_INTERCEPTOR_GLOBAL_SETTING, {
        terminalLog: true,
        toastLog: true,
        transmission: false,
        globalSwitch: true
      })
    }
    setMockData()
  }
})
