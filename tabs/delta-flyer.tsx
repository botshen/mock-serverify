import { RouterProvider } from "react-router-dom"

import "../assets/style.scss"

import { globalRouters } from "./router"

export default function DeltaFlyerPage() {
  return <RouterProvider router={globalRouters} />
}
