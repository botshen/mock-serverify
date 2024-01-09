import { CopyIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import {
  Switch,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"

import { useStorage } from "@plasmohq/storage/hook"

import RulesNavBar from "./components/RulesNavBar"
import { defaultValueFunction, storageConfig } from "./store"

export default function SavedRules() {
  const projectInfo = useLocation().state
  const [projects, setProjects] = useStorage<ProjectType[]>(
    storageConfig,
    defaultValueFunction
  )
  const navigation = useNavigate()
  const handleEdit = (pathRule: string) => {
    navigation("/editRule", {
      state: {
        baseUrl: projectInfo.baseUrl,
        pathRule: pathRule,
        mode: "edit"
      }
    })
  }
  const handleDelete = (pathRule: string) => {
    setProjects(
      projects.map((item: ProjectType) => {
        if (item.baseUrl === projectInfo.baseUrl) {
          item.rules = item.rules.filter((i) => i.pathRule !== pathRule)
        }
        return item
      })
    )
  }

  const handleChangeSwitch = (index: number) => {
    setProjects(
      projects.map((item: ProjectType) => {
        if (item.baseUrl === projectInfo.baseUrl) {
          item.rules[index].switchOn = !item.rules[index].switchOn
        }
        return item
      })
    )
  }

  const fontSize = "medium"
  const iconStyle = { marginRight: "10px", cursor: "pointer" }

  const rules =
    projects?.find(
      (i: { baseUrl: string }) => i.baseUrl === projectInfo.baseUrl
    )?.rules || []

  return (
    <>
      <RulesNavBar baseUrl={projectInfo.baseUrl} />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize={fontSize}>Url</Th>
              <Th fontSize={fontSize}>Method</Th>
              <Th fontSize={fontSize}>Code</Th>
              <Th fontSize={fontSize}>SwitchOn</Th>
              <Th fontSize={fontSize}>Comment</Th>
              <Th fontSize={fontSize}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rules.length > 0 &&
              rules.map(
                ({ Comments, pathRule, Method, code, switchOn }, index) => (
                  <Tr key={pathRule}>
                    <Td fontSize={fontSize}>{pathRule}</Td>
                    <Td fontSize={fontSize}>
                      <Tag
                        size="md"
                        key={Method}
                        variant="solid"
                        colorScheme="teal">
                        {Method}
                      </Tag>
                    </Td>
                    <Td fontSize={fontSize}>{code}</Td>
                    <Td fontSize={fontSize}>
                      <Switch
                        isChecked={switchOn}
                        onChange={() => handleChangeSwitch(index)}
                        colorScheme="red"
                      />
                    </Td>
                    <Td fontSize={fontSize}>{Comments || "none"}</Td>
                    <Td fontSize={fontSize}>
                      <EditIcon
                        onClick={() => handleEdit(pathRule)}
                        {...iconStyle}></EditIcon>
                      <CopyIcon {...iconStyle}></CopyIcon>
                      <DeleteIcon
                        onClick={() => handleDelete(pathRule)}
                        {...iconStyle}></DeleteIcon>
                    </Td>
                  </Tr>
                )
              )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
