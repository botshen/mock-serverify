import { SimpleGrid } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"

import { useStorage } from "@plasmohq/storage/hook"

import ProjectCard from "./components/ProjectCard"
import ProjectNavBar from "./components/ProjectNavBar"

export default function ProjectList() {
  const location = useLocation()
  console.log(location.pathname)

  const [projectList, setprojectList] = useStorage(
    "mock_genius_projects",
    (v) =>
      v === undefined
        ? [
            {
              isRealRequest: false,
              isTerminalLogOpen: false,
              baseUrl: "http://localhost:23223",
              name: "wjnwncnw",
              description: "nwncwnc",
              rules: [
                {
                  Response: {
                    code: 200,
                    data: {},
                    message: "success"
                  },
                  code: "200",
                  delay: "0",
                  method: "POST",
                  name: "test",
                  pathRule: "/api/test",
                  switchOn: true
                }
              ],
              switchOn: true
            },
            {
              isRealRequest: false,
              isTerminalLogOpen: false,
              baseUrl: "http://localhost:5122273",
              name: "swst",
              description: "2222",
              rules: [
                {
                  Response: {
                    code: 200,
                    data: {},
                    message: "success"
                  },
                  code: "200",
                  delay: "0",
                  method: "POST",
                  name: "test",
                  pathRule: "/api/test",
                  switchOn: true
                }
              ],
              switchOn: true
            }
          ]
        : v
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
