import { List, ListIcon, ListItem, Text } from "@chakra-ui/react"
import React from "react"
import { GrProjects } from "react-icons/gr"
import { useLocation, useNavigate } from "react-router-dom"

const menu = [
  {
    name: "Projects",
    link: "/projectList"
  },
  {
    name: "Settings",
    link: "/settings"
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

  return (
    <List spacing={3} padding="20px">
      {menu.map((val) => {
        return (
          <ListItem
            cursor="pointer"
            fontWeight={location.pathname === val.link ? "bold" : "normal"}
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
