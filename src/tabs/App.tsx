import { RouterProvider } from "react-router-dom"
import Browser from "webextension-polyfill"

import "../../assets/style.scss"

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import Url from "url-parse"

import { useStorage } from "@plasmohq/storage/hook"

import { isMockText } from "~util/utils"

import { globalRouters } from "./router"
import {
  defaultCurrent,
  defaultSettings,
  storageCurrentConfig,
  storageSettings
} from "./store"
import { useLogStore } from "./store/useLogStore"
import theme from "./theme"

export default function DeltaFlyerPage() {
  const [currentProject] = useStorage(storageCurrentConfig, defaultCurrent)
  useStorage(storageSettings, defaultSettings)

  const { addApiLogList } = useLogStore();

  const listenerRef = useRef<(event: Event) => void | null>(null)

  useEffect(() => {
    if (listenerRef.current) {
      Browser.runtime.onMessage.removeListener(listenerRef.current)
    }

    if (!currentProject) {
      return
    }

    const messageListener = async (event) => {
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
        addApiLogList(result as any)
      }
    }

    listenerRef.current = messageListener
    Browser.runtime.onMessage.addListener(messageListener)

    return () => {
      if (listenerRef.current) {
        Browser.runtime.onMessage.removeListener(listenerRef.current)
      }
    }
  }, [currentProject, addApiLogList])

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={globalRouters} />
    </ChakraProvider>
  )
}
