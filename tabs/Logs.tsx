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
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Logs() {
  const location = useLocation()
  console.log(
    "%c [ location ]-7",
    "font-size:13px; background:pink; color:#bf2c9f;",
    location
  )
  const [list, setList] = useState([
    {
      comment: "some comment",
      url: "/api.v1/some/url",
      method: "GET",
      code: 200,
      mock: "1",
      type: "get"
    },
    {
      comment: "some comment",
      url: "/api.v2/some/url",
      method: "GET",
      code: 200,
      mock: "1",
      type: "get"
    }
  ])

  const navigation = useNavigate()

  const handleRowClick = (row) => {
    navigation("edit")
  }
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize="medium">Comment</Th>
              <Th fontSize="medium">Url</Th>
              <Th fontSize="medium">Method</Th>
              <Th fontSize="medium">Code</Th>
              <Th fontSize="medium">Mock</Th>
              <Th fontSize="medium">Type</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map((item, index) => (
              <Tr key={index} onClick={() => handleRowClick(item)}>
                <Td fontSize="medium">{item.comment}</Td>
                <Td fontSize="medium">{item.url}</Td>
                <Td fontSize="medium">{item.method}</Td>
                <Td fontSize="medium">{item.code}</Td>
                <Td fontSize="medium">{item.mock}</Td>
                <Td fontSize="medium">{item.type}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
