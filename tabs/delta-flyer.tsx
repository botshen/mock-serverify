import { RouterProvider } from "react-router-dom"

import "../assets/style.scss"

import { ChakraProvider } from "@chakra-ui/react"

import { globalRouters } from "./router"

export default function DeltaFlyerPage() {
  return (
    <ChakraProvider>
      <RouterProvider router={globalRouters} />{" "}
    </ChakraProvider>
  )
}
