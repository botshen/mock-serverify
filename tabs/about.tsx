import { Center, Image, Text } from "@chakra-ui/react"
import React from "react"

import logo from "../assets/icon.png"

const About = () => {
  return (
    <Center>
      <div>
        <Image src={logo} boxSize="350px" padding="10px" />
        <Text textAlign="center" fontSize="xxx-large" fontWeight="bold">
          Mock Serverity
        </Text>
        <Text textAlign="center" fontSize="xxx-large" fontWeight="bold">
          Version: 0.0.1
        </Text>
      </div>
    </Center>
  )
}

export default About
