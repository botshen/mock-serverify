import { AddIcon, PhoneIcon, WarningIcon } from "@chakra-ui/icons"
import {
  Button,
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
import { useNavigate } from "react-router-dom"

import { useStorage } from "@plasmohq/storage/hook"

import { defaultCurrent, storageCurrentConfig } from "./store"
import { useLogStore } from "./store/useLogStore"

export default function Logs() {
  const [currentProject] = useStorage(storageCurrentConfig, defaultCurrent)
  const { apiLogList, clearLogList } = useLogStore()

  const navigation = useNavigate()

  const handleRowClick = (row) => {
    navigation("/editRule", {
      state: {
        row,
        mode: "log",
        baseUrl: currentProject
      }
    })
  }

  return (
    <>
      <Button onClick={clearLogList}>clear log</Button>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize="medium">Url</Th>
              <Th fontSize="medium">Method</Th>
              <Th fontSize="medium">Code</Th>
              <Th fontSize="medium">Mock</Th>
              <Th fontSize="medium">Type</Th>
              <Th fontSize="medium">Mock Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {apiLogList.length > 0 &&
              apiLogList.map((item, index) => (
                <Tr key={index} onClick={() => handleRowClick(item)}>
                  <Td fontSize="medium">{item.url}</Td>
                  <Td fontSize="medium">{item.method}</Td>
                  <Td fontSize="medium">{item.status}</Td>
                  <Td fontSize="medium">{item.mock}</Td>
                  <Td fontSize="medium">{item.type}</Td>
                  <Td fontSize="medium">{item.mockTime}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
