import { CopyIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import {
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"

import { useStorage } from "@plasmohq/storage/hook"

import RulesNavBar from "./components/RulesNavBar"

export default function SavedRules() {
  const projectInfo = useLocation().state
  const [projects, setProjects] = useStorage("mock_genius_projects")
  const navigation = useNavigate()
  const handleEdit = (pathRule: string) => {
    navigation("/editRule", {
      state: {
        baseUrl: projectInfo.baseUrl,
        pathRule: pathRule
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

  const handleChangeSwitch = (index: number) => {}

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
              <Th fontSize={fontSize}>Comment</Th>
              <Th fontSize={fontSize}>Url</Th>
              <Th fontSize={fontSize}>Method</Th>
              <Th fontSize={fontSize}>Code</Th>
              <Th fontSize={fontSize}>SwitchOn</Th>
              <Th fontSize={fontSize}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rules.length > 0 &&
              rules.map(
                ({ Comments, pathRule, Method, code, switchOn }, index) => (
                  <Tr key={pathRule}>
                    <Td fontSize={fontSize}>{Comments}</Td>
                    <Td fontSize={fontSize}>{pathRule}</Td>
                    <Td fontSize={fontSize}>{Method}</Td>
                    <Td fontSize={fontSize}>{code}</Td>
                    <Td fontSize={fontSize}>
                      <Switch
                        isChecked={switchOn}
                        onChange={() => handleChangeSwitch(index)}
                        colorScheme="red"
                      />
                    </Td>
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
