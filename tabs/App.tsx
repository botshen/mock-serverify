import { RouterProvider } from "react-router-dom"

import "../assets/style.scss"

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { useEffect } from "react"
import Url from "url-parse"

import { useStorage } from "@plasmohq/storage/hook"

import { globalRouters } from "./router"
import {
  defaultCurrent,
  defaultLogsFunction,
  storageCurrentConfig,
  storageLogsConfig
} from "./store"
import theme from "./theme"

const isMockText = (isMock: boolean) => {
  if (isMock) {
    return "Mock"
  } else {
    return "穿透"
  }
}
export default function DeltaFlyerPage() {
  const [currentProject] = useStorage(storageCurrentConfig, defaultCurrent)
  const [logs, setLogs] = useStorage(storageLogsConfig, defaultLogsFunction)

  useEffect(() => {
    ;(async () => {
      try {
        chrome.runtime.onMessage.addListener(async (event) => {
          if (!currentProject) {
            return
          }
          if (event.type === "ajaxInterceptor") {
            const data = event.data
            const targetUrl = new Url(data.request.url)
            const result = {
              url: targetUrl.pathname,
              status: data.response.status,
              mock: isMockText(data.isMock),
              type: data.request.type,
              method: data.request.method,
              Response: data.response.responseTxt,
              origin: targetUrl.origin,
              switchOn: data.switchOn ?? true,
              requestHeaders: data.request.headers,
              responseHeaders: data.response.headers,
              mockTime: new Date().toLocaleString("zh-CN", {
                hour12: false
              })
            }
            setLogs(() => {
              if (logs.length > 5) {
                logs.pop()
              }
              return [result, ...logs]
            })
          }
        })
      } catch (error) {}
    })()
  }, [logs])
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={globalRouters} />
    </ChakraProvider>
  )
}
