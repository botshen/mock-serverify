import { List, ListItem, Text, useColorMode } from "@chakra-ui/react"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

const menu = [
  {
    name: "Projects",
    link: "/projectList"
  },
  {
    name: "Logs",
    link: "/logs"
  },
  {
    name: "Settings",
    link: "/settings"
  },
  {
    name: "About",
    link: "/about"
  }
]
const SideBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuChange = (link: string) => {
    if (location.pathname !== link) {
      navigate(link)
    }
  }
  const { colorMode } = useColorMode()
  const color = () => {
    if (colorMode === "light") {
      return "#43787a"
    } else {
      return "#9ae4d9"
    }
  }

  return (
    <List spacing={3} padding="20px">
      {menu.map((val) => {
        return (
          <ListItem
            cursor="pointer"
            fontWeight={location.pathname === val.link ? "bold" : "normal"}
            color={location.pathname === val.link ? color() : ""}
            borderRadius="4px"
            padding="4px"
            key={val.name}>
            <Text fontSize="xl" onClick={() => handleMenuChange(val.link)}>
              {val.name}
            </Text>
          </ListItem>
        )
      })}
    </List>
  )
}

export default SideBar
