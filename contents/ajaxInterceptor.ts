import { Storage } from "@plasmohq/storage"

import { injectScriptToPage, setGlobalData } from "~tabs/utils"

import {
  AJAX_INTERCEPTOR_CURRENT_PROJECT,
  AJAX_INTERCEPTOR_PROJECTS,
  CUSTOM_EVENT_NAME
} from "../const"

window.addEventListener("load", () => {
  console.log(
    "You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true."
  )
})

const storage = new Storage({
  area: "local",
  copiedKeyList: [AJAX_INTERCEPTOR_CURRENT_PROJECT, AJAX_INTERCEPTOR_PROJECTS]
})

;(async () => {
  console.log("xxx")
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
  console.log(
    "%c [ request ]-88",
    "font-size:13px; background:pink; color:#bf2c9f;",
    request
  )
  if (request.type === "updateRules") {
    const { origin } = location
    console.log(
      "%c [ origin ]-64",
      "font-size:13px; background:pink; color:#bf2c9f;",
      origin
    )
    const currentUrl = request.payload.baseUrl
    console.log(
      "%c [ currentUrl ]-66",
      "font-size:13px; background:pink; color:#bf2c9f;",
      currentUrl
    )
    if (origin === currentUrl) {
      console.log("11111", 11111)
      injectScriptToPage()
      setGlobalData()
    }
  }
})

/**
 * 监听插件的操作界面，设置拦截规则，设置项目的打开关闭或者规则的开启关闭，实时通知给用户的页面
 */
// chrome.storage.onChanged.addListener((changes) => {
//   console.log(
//     "%c [ changes ]-109",
//     "font-size:13px; background:pink; color:#bf2c9f;",
//     changes
//   )
//   const { origin } = location
//   console.log(
//     "%c [ origin ]-115",
//     "font-size:13px; background:pink; color:#bf2c9f;",
//     origin
//   )
//   for (const [key, change] of Object.entries(changes)) {
//     const newValue = change.newValue
//     console.log(
//       "%c [ newValue ]-117",
//       "font-size:13px; background:pink; color:#bf2c9f;",
//       newValue
//     )
//     const oldValue = change.oldValue
//     console.log(
//       "%c [ oldValue ]-119",
//       "font-size:13px; background:pink; color:#bf2c9f;",
//       oldValue
//     )

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

// storage.watch({
//   mock_genius_projects: (c) => {
//     console.log("yyy")
//     console.log(
//       "%c [ c ]-139",
//       "font-size:13px; background:pink; color:#bf2c9f;",
//       c
//     )
//     const { origin } = location

//     injectScriptToPage()
//     setGlobalData()
//   },
//   mockgenius_current_project: (c) => {
//     console.log("zz")
//     if (c.oldValue === origin) {
//       removeInjectScript()
//     }
//     if (c.newValue === origin) {
//       injectScriptToPage()
//       setGlobalData()
//     }
//   }
// })
