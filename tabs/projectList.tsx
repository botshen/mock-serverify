import { SimpleGrid } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"

import ProjectCard from "./components/ProjectCard"
import ProjectNavBar from "./components/ProjectNavBar"

export default function ProjectList() {
  const location = useLocation()
  console.log(location.pathname)
  const projectList = [
    {
      name: "react-hooks1react-hooks1",
      desc: "react hooks 学习1",
      baseUrl: "https://www.baidu.com"
    },
    {
      name: "react-hooks2",
      desc: "react hooks 学习2",
      baseUrl: "https://www.baidu.com"
    },
    {
      name: "react-hook11s3",
      desc: "react hooks 学习3",
      baseUrl: "https://www.baidu.com"
    },
    {
      name: "react-hoo113ks3",
      desc: "react hooks 学习3",
      baseUrl: "https://www.baidu.com"
    },
    {
      name: "react-hooks22",
      desc: "react hooks 学习232",
      baseUrl: "https://www.baidu.32com"
    }
  ]
  return (
    <>
      <ProjectNavBar />
      <SimpleGrid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        spacing={10}
        padding="20px">
        {projectList.map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            description={project.desc}
            baseUrl={project.baseUrl}
          />
        ))}
      </SimpleGrid>
    </>
  )
}
