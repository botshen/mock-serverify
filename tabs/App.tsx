import { RouterProvider } from "react-router-dom"

import "../assets/style.scss"

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"

import { useStorage } from "@plasmohq/storage/hook"

import { globalRouters } from "./router"
import { defaultCurrent, storageCurrentConfig } from "./store"
import theme from "./theme"

export default function DeltaFlyerPage() {
  const [projects, setProjects] = useStorage<ProjectType[]>(
    storageCurrentConfig,
    defaultCurrent
  )
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={globalRouters} />
    </ChakraProvider>
  )
}
