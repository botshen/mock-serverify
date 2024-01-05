import { Center, Image, Text } from "@chakra-ui/react"
import React from "react"

import logo from "../assets/icon.png"

const About = () => {
  return (
    <div>
      <Image src={logo} boxSize="100px" padding="10px" />
      <Text fontSize="medium" fontWeight="bold">
        Mock Serverity
      </Text>
      <Text fontSize="medium" fontWeight="bold">
        Version: 0.0.1
      </Text>
    </div>
  )
}

export default About
