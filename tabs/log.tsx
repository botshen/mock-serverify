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
import { useLocation } from "react-router-dom"

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
      switchOn: false
    },
    {
      comment: "some comment",
      url: "/api.v2/some/url",
      method: "GET",
      code: 200,
      switchOn: true
    }
  ])
  const handleChangeSwitch = (index: number) => {
    const newList = [...list]
    newList[index].switchOn = !newList[index].switchOn
    setList(newList)
  }
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th fontSize="x-large">Comment</Th>
              <Th fontSize="x-large">Url</Th>
              <Th fontSize="x-large">Method</Th>
              <Th fontSize="x-large">Code</Th>
              <Th fontSize="x-large">SwitchOn</Th>
              <Th fontSize="x-large">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map((item, index) => (
              <Tr key={index}>
                <Td fontSize="x-large">{item.comment}</Td>
                <Td fontSize="x-large">{item.url}</Td>
                <Td fontSize="x-large">{item.method}</Td>
                <Td fontSize="x-large">{item.code}</Td>
                <Td fontSize="x-large">
                  <Switch
                    isChecked={item.switchOn}
                    onChange={() => handleChangeSwitch(index)}
                    colorScheme="red"
                  />
                </Td>
                <Td fontSize="x-large">
                  <AddIcon marginRight="10px" cursor="pointer"></AddIcon>
                  <PhoneIcon marginRight="10px" cursor="pointer"></PhoneIcon>
                  <WarningIcon cursor="pointer"></WarningIcon>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
