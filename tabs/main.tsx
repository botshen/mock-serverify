import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  type BoxProps,
  type FlexProps
} from "@chakra-ui/react"
import type { IconType } from "react-icons"
import { FiCompass, FiHome, FiSettings, FiTrendingUp } from "react-icons/fi"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { useStorage } from "@plasmohq/storage/hook"

import logo from "../assets/icon.png"
import { defaultCurrent, storageCurrentConfig } from "./store"

interface NavItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}
const menu = [
  {
    name: "Projects",
    link: "/projectList",
    icon: FiHome
  },
  {
    name: "Logs",
    link: "/logs",
    icon: FiTrendingUp
  },
  {
    name: "Settings",
    link: "/settings",
    icon: FiSettings
  },
  {
    name: "About",
    link: "/about",
    icon: FiCompass
  }
]

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { colorMode } = useColorMode()

  const handleMenuChange = (link: string) => {
    if (location.pathname !== link) {
      navigate(link)
    }
  }
  const color = () => {
    if (colorMode === "light") {
      return "#51c3e7"
    } else {
      return "#2f3747"
    }
  }
  const textColor = () => {
    if (colorMode === "light") {
      return "#fff"
    } else {
      return "#fff"
    }
  }

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <HStack>
          <Image src={logo} boxSize="60px" padding="10px"></Image>
          <Text fontSize="medium" fontWeight="bold">
            Mock Serverity
          </Text>
        </HStack>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {menu.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          color={location.pathname === link.link ? textColor() : ""}
          bg={location.pathname === link.link ? color() : ""}
          onClick={() => handleMenuChange(link.link)}>
          <Text fontSize="xl">{link.name}</Text>
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  const { colorMode } = useColorMode()

  const hoverColor = () => {
    if (colorMode === "light") {
      return {
        bg: "#6cc1e4",
        color: "white"
      }
    } else {
      return {
        bg: "#2f3747",
        color: "white"
      }
    }
  }
  return (
    <Box
      as="a"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        m="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={hoverColor()}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white"
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const [curProjects, setCurProjects] = useStorage<string>(
    storageCurrentConfig,
    defaultCurrent
  )
  const { colorMode, toggleColorMode } = useColorMode()
  const handleClearMock = () => {
    setCurProjects("")
  }
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
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "space-between" }}
      {...rest}>
      <HStack>
        <Text fontSize="xl" fontWeight="bold" color={colorTitle()}>
          currently intercepted:
        </Text>
        <Text fontSize="xl" fontWeight="bold" color={colorUrl()}>
          {curProjects === "" ? "none" : curProjects}
        </Text>
      </HStack>
      <HStack spacing={{ base: "0", md: "6" }}>
        <Button onClick={handleClearMock}>Clear Mock</Button>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </HStack>
    </Flex>
  )
}

const Main = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  )
}

export default Main
