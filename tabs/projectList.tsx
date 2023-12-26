import { SimpleGrid } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"

import { useStorage } from "@plasmohq/storage/hook"

import ProjectCard from "./components/ProjectCard"
import ProjectNavBar from "./components/ProjectNavBar"

export default function ProjectList() {
  const location = useLocation()
  const [projectList] = useStorage("mock_genius_projects", (v) => v ?? [])
  console.log(
    "%c [ projectList ]-12",
    "font-size:13px; background:pink; color:#bf2c9f;",
    projectList
  )

  return (
    <>
      <ProjectNavBar />
      <SimpleGrid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        spacing={10}
        padding="20px">
        {projectList.map((project) => (
          <ProjectCard
            key={project.baseUrl}
            name={project.name}
            description={project.description}
            baseUrl={project.baseUrl}
          />
        ))}
      </SimpleGrid>
    </>
  )
}
