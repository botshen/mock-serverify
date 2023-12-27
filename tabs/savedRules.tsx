import { AddIcon, PhoneIcon, WarningIcon } from "@chakra-ui/icons"
import {
  Switch,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
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

  const handleEdit = (row) => {
    navigation("edit")
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
                      <AddIcon
                        onClick={() =>
                          handleEdit({
                            Comments,
                            pathRule,
                            Method,
                            code,
                            switchOn
                          })
                        }
                        {...iconStyle}></AddIcon>
                      <PhoneIcon {...iconStyle}></PhoneIcon>
                      <WarningIcon {...iconStyle}></WarningIcon>
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
