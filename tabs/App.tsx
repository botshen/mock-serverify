import { RouterProvider } from "react-router-dom"

import "../assets/style.scss"

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"

import { globalRouters } from "./router"
import theme from "./theme"

export default function DeltaFlyerPage() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={globalRouters} />
    </ChakraProvider>
  )
}
