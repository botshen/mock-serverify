import { extendTheme, type ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "dark"
}
const fonts = {
  // body: "Jetbrains Mono, Geneva, sans-serif"
  // heading: "Jetbrains Mono, Geneva, sans-serif"
}
const theme = extendTheme({ config, fonts })

export default theme
