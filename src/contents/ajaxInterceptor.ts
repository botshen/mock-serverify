import Browser from "webextension-polyfill"

import { Storage } from "@plasmohq/storage"

import {
  AJAX_INTERCEPTOR_CURRENT_PROJECT,
  AJAX_INTERCEPTOR_PROJECTS,
  AJAX_INTERCEPTOR_SETTINGS,
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
export const sendMessage = async (message: { type: string; data: any }) => {
  try {
    await await Browser.runtime.sendMessage(message)
  } catch (error) {
    if (
      !(error instanceof Error) ||
      error.message !==
        "Could not establish connection. Receiving end does not exist."
    ) {
      throw error
    }
  }
}
window.addEventListener(
  CUSTOM_EVENT_NAME,
  async (event) => {
    if (Browser.runtime?.id) {
      try {
        const customEvent = event as CustomEvent
        const currentNameUrl = await storage.get(
          AJAX_INTERCEPTOR_CURRENT_PROJECT
        )
        if (customEvent.detail && location.origin === currentNameUrl) {
          await sendMessage({
            type: "ajaxInterceptor",
            data: customEvent.detail
          })
        }
      } catch (error) {
        console.error(error)
      }
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
  [AJAX_INTERCEPTOR_SETTINGS]: async (c) => {
    if (c.newValue === undefined) {
      storage.set(AJAX_INTERCEPTOR_SETTINGS, {
        terminalLog: true,
        toastLog: true,
        transmission: false
      })
    }
    setMockData()
  }
})
