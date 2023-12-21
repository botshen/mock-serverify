import { SimpleGrid } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"

import ProjectCard from "./components/ProjectCard"

export default function ProjectList() {
  const location = useLocation()
  console.log(location.pathname)
  const projectList = [
    {
      name: "react-hooks",
      desc: "react hooks 学习"
    },
    {
      name: "react-hooks2",
      desc: "react hooks 学习"
    },
    {
      name: "react-hooks1",
      desc: "react hooks 学习"
    }
  ]
  return (
    <>
      <SimpleGrid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        spacing={10}>
        {projectList.map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            description={project.desc}
          />
        ))}
      </SimpleGrid>
    </>
  )
}
