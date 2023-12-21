import { Button, Grid, GridItem } from "@chakra-ui/react"
import { Outlet, useNavigate } from "react-router-dom"

import "../assets/style.scss"

import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"

export default function Main() {
  const navigation = useNavigate()

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr"
      }}>
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem area="aside">
        <SideBar />
      </GridItem>
      <GridItem area="main">
        <Outlet />
      </GridItem>
    </Grid>
  )
}
