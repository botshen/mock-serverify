import type { XhrRequestConfig } from "ajax-hook"
import Url from "url-parse"
import insertUrl from "url:./insert.ts"

import { Storage } from "@plasmohq/storage"

import { INJECT_ELEMENT_ID } from "./const"

export type Methods =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "OPTIONS"
  | "HEAD"
  | "TRACE"
  | "CONNECT"

export function logTerminalMockMessage(
  config: XhrRequestConfig,
  result: { response: string },
  request: any
) {
  const targetUrl = new Url(request.url)
  const str = targetUrl.pathname
  const css = "font-size:13px; background:#d5562e; color:#fff;"
  console.log(
    `%c [ URL ] %c${str} %c [ METHOD ] %c${request.method}`,
    css, // 样式1，用于 'URL:'
    "", // 默认样式，用于 'str'
    css, // 样式1，用于 'URL:'
    "" // 默认样式，用于 'str'
  )
  if (JSON.parse(config.body)) {
    console.log("%c [ request-body ] ", css, JSON.parse(config.body))
  }
  if (result.response && result.response !== "") {
    console.log("%c [ response ] ", css, result.response)
  } else if (result.response === "") {
    console.log("%c [ response ] ", css, "空字符串")
  }
}

function parseReadableStream(
  readableStream: ReadableStream<Uint8Array>
): Promise<string> {
  const textDecoder = new TextDecoder("utf-8")

  return new Promise(
    (resolve: (value: string) => void, reject: (reason?: any) => void) => {
      const chunks: string[] = []

      const reader = readableStream.getReader()

      function readChunk() {
        reader
          .read()
          .then(({ done, value }) => {
            if (done) {
              resolve(chunks.join(""))
              return
            }

            // 解码并存储数据块
            const decodedText = textDecoder.decode(value)
            chunks.push(decodedText)

            // 继续读取下一个数据块
            readChunk()
          })
          .catch(reject)
      }

      // 开始读取数据
      readChunk()
    }
  )
}

export function logFetch(request: any, response: any) {
  parseReadableStream(request.body).then((res) => {
    const targetUrl = new Url(request.url)
    const str = targetUrl.pathname
    const css = "font-size:13px; background:pink; color:#bf2c9f;"
    console.log(
      `%c [ URL ] %c${str} %c [ METHOD ] %c${request.method}`,
      css, // 样式1，用于 'URL:'
      "", // 默认样式，用于 'str'
      css, // 样式1，用于 'URL:'
      "" // 默认样式，用于 'str'
    )
    if (JSON.parse(res)) {
      console.log("%c [ request-body ] ", css, JSON.parse(res))
    }
    if (response) {
      response.json().then((data: any) => {
        if (data === "") {
          console.log("%c [ response ] ", css, "空字符串")
        } else {
          console.log("%c [ response ] ", css, data)
        }
      })
    }
  })
}
const executeScript = (data: any) => {
  const code = JSON.stringify(data)
  const inputElem = document.getElementById(INJECT_ELEMENT_ID)
  const inputData = inputElem as HTMLInputElement
  inputData.value = code
}
const storage = new Storage({
  area: "local",
  copiedKeyList: ["mock_genius_projects", "mockgenius_current_project"]
})

export const setGlobalData = async () => {
  console.log("setGlobalData")
  const list = await storage.get("mock_genius_projects")
  const cur = await storage.get("mockgenius_current_project")
  const result = {
    mock_genius_projects: list,
    mockgenius_current_project: cur
  }
  executeScript(result)
}
export const injectScriptToPage = () => {
  console.log("injectScriptToPage")
  try {
    removeInjectScript()
    let insertScript = document.createElement("script")
    insertScript.setAttribute("type", "module")
    insertScript.src = insertUrl
    document.documentElement.appendChild(insertScript)
    const input = document.createElement("input")
    input.setAttribute("id", INJECT_ELEMENT_ID)
    input.setAttribute("style", "display:none")
    document.documentElement.appendChild(input)
  } catch (err) {
    console.error("err", err)
  }
}
export function removeInjectScript() {
  console.log("removeInjectScript")
  // 创建正则表达式，匹配动态部分
  const regex =
    /^chrome-extension:\/\/lgabnfcflgnaldfgnaedddgoenldnhdf\/insert\.[a-f0-9]+\.js\?[0-9]+$/

  // 查找所有 script 元素
  const scriptElements = document.querySelectorAll("script")

  // 遍历所有 script 元素
  scriptElements.forEach(function (scriptElement) {
    // 检查元素的 src 属性是否匹配正则表达式
    if (regex.test(scriptElement.src)) {
      // 如果匹配，则删除该元素
      scriptElement.parentNode.removeChild(scriptElement)
    }
  })
  const oldInput = document.getElementById(INJECT_ELEMENT_ID)

  if (oldInput) {
    oldInput.parentNode?.removeChild(oldInput)
  }
}
