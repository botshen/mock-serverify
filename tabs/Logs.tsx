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
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useStorage } from "@plasmohq/storage/hook"

import { defaultLogsFunction, storageLogsConfig } from "./store"

export default function Logs() {
  const location = useLocation()
  console.log(
    "%c [ location ]-23",
    "font-size:13px; background:pink; color:#bf2c9f;",
    location
  )

  const [logs, setLogs] = useStorage(storageLogsConfig, defaultLogsFunction)

  const navigation = useNavigate()

  const handleRowClick = (row) => {
    navigation("/editRule", {
      state: {
        row,
        mode: "log"
      }
    })
  }
  const clearLogs = () => {
    setLogs([])
  }
  return (
    <>
      <Button onClick={clearLogs}>clear log</Button>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {/* <Th fontSize="medium">Comment</Th> */}
              <Th fontSize="medium">Url</Th>
              <Th fontSize="medium">Method</Th>
              <Th fontSize="medium">Code</Th>
              <Th fontSize="medium">Mock</Th>
              <Th fontSize="medium">Type</Th>
              <Th fontSize="medium">Mock Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {logs.length > 0 &&
              logs.map((item, index) => (
                <Tr key={index} onClick={() => handleRowClick(item)}>
                  {/* <Td fontSize="medium">{item.comment}</Td> */}
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
