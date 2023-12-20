import { Button, Grid, GridItem } from "@chakra-ui/react"
import { Outlet, useNavigate } from "react-router-dom"

import "../assets/style.scss"

import NavBar from "./components/NavBar"

export default function Main() {
  const navigation = useNavigate()

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`
      }}>
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem area="aside" bg="gold">
        aside
      </GridItem>
      <GridItem area="main" bg="blue">
        <Outlet />
      </GridItem>
    </Grid>
  )
}
