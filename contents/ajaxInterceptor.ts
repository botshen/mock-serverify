import { Storage } from "@plasmohq/storage"

import { injectScriptToPage, setGlobalData } from "~tabs/utils"

import {
  AJAX_INTERCEPTOR_CURRENT_PROJECT,
  AJAX_INTERCEPTOR_PROJECTS,
  CUSTOM_EVENT_NAME
} from "../const"

// window.addEventListener("load", () => {
//   console.log(
//     "You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true."
//   )
// })

const storage = new Storage({
  area: "local",
  copiedKeyList: [AJAX_INTERCEPTOR_CURRENT_PROJECT, AJAX_INTERCEPTOR_PROJECTS]
})

;(async () => {
  const currentNameUrl = await storage.get(AJAX_INTERCEPTOR_CURRENT_PROJECT)
  if (origin === currentNameUrl) {
    injectScriptToPage()
    setGlobalData()
  }
})()

window.addEventListener(
  CUSTOM_EVENT_NAME,
  async (event) => {
    if (chrome.runtime?.id) {
      try {
        const customEvent = event as CustomEvent
        const currentNameUrl = await storage.get(
          AJAX_INTERCEPTOR_CURRENT_PROJECT
        )
        const { origin } = location
        if (customEvent.detail && origin === currentNameUrl) {
          await chrome.runtime.sendMessage({
            type: "ajaxInterceptor",
            message: "content_to_background",
            data: customEvent.detail
          })
        }
      } catch (error) {
        // console.error("error", error)
      }
    }
  },
  false
)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "updateRules") {
    const { origin } = location
    const currentUrl = request.payload.baseUrl
    if (origin === currentUrl) {
      injectScriptToPage()
      setGlobalData()
    }
  }
})

storage.watch({
  mock_genius_projects: (c) => {
    if (c.newValue === undefined) {
      // 设置初始值
      storage.set(AJAX_INTERCEPTOR_PROJECTS, [])
    }
  },
  mockgenius_current_project: (c) => {
    if (c.newValue === undefined) {
      // 设置初始值
      storage.set(AJAX_INTERCEPTOR_CURRENT_PROJECT, "")
    }
  }
})
