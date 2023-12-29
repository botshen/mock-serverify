import { SimpleGrid } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import ProjectCard from "./components/ProjectCard"
import ProjectNavBar from "./components/ProjectNavBar"
import { defaultValueFunction, storageConfig } from "./store"

export default function ProjectList() {
  const [projectList] = useStorage<ProjectType[]>(
    storageConfig,
    defaultValueFunction
  )

  return (
    <>
      <ProjectNavBar />
      <SimpleGrid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        spacing={10}
        padding="20px">
        {projectList.length > 0 &&
          projectList.map((project) => (
            <ProjectCard
              key={project?.baseUrl}
              name={project?.name}
              description={project?.description}
              baseUrl={project?.baseUrl}
            />
          ))}
      </SimpleGrid>
    </>
  )
}
