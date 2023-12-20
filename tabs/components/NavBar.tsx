import { HStack, Image, Text } from "@chakra-ui/react"

import logo from "../../assets/mocking.png"

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} boxSize="60px" padding="10px"></Image>
      <Text fontSize="large">mock-serverify</Text>
    </HStack>
  )
}

export default NavBar
