import Url from "url-parse"

import { Storage } from "@plasmohq/storage"

import {
  AJAX_INTERCEPTOR_CURRENT_PROJECT,
  AJAX_INTERCEPTOR_PROJECTS,
  CUSTOM_EVENT_NAME,
  INJECT_ELEMENT_ID,
  SCRIPT_JS
} from "../const"
import { injectScriptToPage, setGlobalData } from "../utils"

window.addEventListener("load", () => {
  console.log(
    "You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true."
  )
})

interface ResponseHeaders {
  [key: string]: string
}
interface Rule {
  Response: {
    [key: string]: object | string | number
  }
  code: string
  comments: string
  delay: string
  method: string
  pathRule: string
  responseHeaders: ResponseHeaders
  switchOn: boolean
  status: string
  mock: string
  type: string
}
export interface MockGeniusProject {
  isRealRequest: boolean
  isTerminalLogOpen: boolean
  pathUrl: string
  projectName: string
  rules: Rule[]
  switchOn: boolean
}
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

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.action === "refreshTabToContent") {
//     const { pathUrl } = request.data
//     console.log(
//       "%c [ pathUrl ]-99",
//       "font-size:13px; background:pink; color:#bf2c9f;",
//       pathUrl
//     )
//     const { origin } = location
//     console.log(
//       "%c [ origin ]-101",
//       "font-size:13px; background:pink; color:#bf2c9f;",
//       origin
//     )
//     if (origin === pathUrl) {
//       injectScriptToPage()
//       setGlobalData()
//     }
//   }
// })

/**
 * 监听插件的操作界面，设置拦截规则，设置项目的打开关闭或者规则的开启关闭，实时通知给用户的页面
 */
// chrome.storage.onChanged.addListener((changes) => {
//   const { origin } = location
//   for (const [key, change] of Object.entries(changes)) {
//     const newValue = change.newValue
//     const oldValue = change.oldValue

//     // 移除之前的插入的 script 和 input
//     if (oldValue === origin) {
//       const oldInsertScript = document.querySelector(SCRIPT_JS)
//       const oldInput = document.getElementById(INJECT_ELEMENT_ID)
//       if (oldInsertScript) {
//         oldInsertScript.parentNode?.removeChild(oldInsertScript)
//       }
//       if (oldInput) {
//         oldInput.parentNode?.removeChild(oldInput)
//       }
//     } else {
//       // 检查新的值，如果需要插入新的脚本和输入元素，可以在这里执行操作
//       if (newValue) {
//         // 如果是当前页面，就插入脚本
//         if (oldValue !== origin && typeof oldValue === "string") {
//           injectScriptToPage()
//         }
//         setGlobalData()
//       }
//     }
//   }
// })

storage.watch({
  mock_genius_projects: (c) => {
    const { origin } = location

    // Handle removal of script and input elements if the old value matches the origin
    if (c.oldValue === origin) {
      const oldInsertScript = document.querySelector(SCRIPT_JS)
      const oldInput = document.getElementById(INJECT_ELEMENT_ID)
      if (oldInsertScript) {
        oldInsertScript.parentNode?.removeChild(oldInsertScript)
      }
      if (oldInput) {
        oldInput.parentNode?.removeChild(oldInput)
      }
    } else {
      // Handle insertion of script and input elements if the new value is truthy
      if (c.newValue) {
        // If it is the current page, insert the script
        if (c.oldValue !== origin && typeof c.oldValue === "string") {
          injectScriptToPage()
        }
        setGlobalData()
      }
    }
  },
  mockgenius_current_project: (c) => {
    console.log(c.newValue)
    console.log(c.oldValue)
    // Handle other actions related to mockgenius_current_project if needed
  }
})
