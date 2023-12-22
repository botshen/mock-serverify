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

export default function SavedRules() {
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
  const navigation = useNavigate()

  const handleEdit = (row) => {
    console.log(
      "%c [ row ]-46",
      "font-size:13px; background:pink; color:#bf2c9f;",
      row
    )
    navigation("edit")
  }
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th fontSize="medium">Comment</Th>
              <Th fontSize="medium">Url</Th>
              <Th fontSize="medium">Method</Th>
              <Th fontSize="medium">Code</Th>
              <Th fontSize="medium">SwitchOn</Th>
              <Th fontSize="medium">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map((item, index) => (
              <Tr key={index}>
                <Td fontSize="medium">{item.comment}</Td>
                <Td fontSize="medium">{item.url}</Td>
                <Td fontSize="medium">{item.method}</Td>
                <Td fontSize="medium">{item.code}</Td>
                <Td fontSize="medium">
                  <Switch
                    isChecked={item.switchOn}
                    onChange={() => handleChangeSwitch(index)}
                    colorScheme="red"
                  />
                </Td>
                <Td fontSize="medium">
                  <AddIcon
                    onClick={() => handleEdit(item)}
                    marginRight="10px"
                    cursor="pointer"></AddIcon>
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
