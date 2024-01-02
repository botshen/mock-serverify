import { Button, HStack, Image, Text, useColorMode } from "@chakra-ui/react"

import { useStorage } from "@plasmohq/storage/hook"

import { defaultCurrent, storageCurrentConfig } from "~tabs/store"

import logo from "../../assets/icon.png"
import ColorModeSwitch from "./ColorModeSwitch"

const NavBar = () => {
  const [curProjects, setCurProjects] = useStorage<string>(
    storageCurrentConfig,
    defaultCurrent
  )
  const { colorMode } = useColorMode()
  const colorUrl = () => {
    if (colorMode === "light") {
      return "#43787a"
    } else {
      return "#9ae4d9"
    }
  }
  const colorTitle = () => {
    if (colorMode === "light") {
      return "#b53d37"
    } else {
      return "#f3b5b4"
    }
  }
  const handleClearMock = () => {
    setCurProjects("")
  }
  return (
    <HStack justifyContent="space-between" padding="10px">
      <HStack>
        <Image src={logo} boxSize="60px" padding="10px"></Image>
        <Text fontSize="xl" fontWeight="bold">
          Mock Serverity
        </Text>
      </HStack>
      <HStack>
        <Text fontSize="xl" fontWeight="bold" color={colorTitle()}>
          currently intercepted:
        </Text>
        <Text fontSize="xl" fontWeight="bold" color={colorUrl()}>
          {curProjects === "" ? "none" : curProjects}
        </Text>
      </HStack>

      <HStack>
        <Button onClick={handleClearMock}>Clear Mock</Button>
        <ColorModeSwitch></ColorModeSwitch>
      </HStack>
    </HStack>
  )
}

export default NavBar
