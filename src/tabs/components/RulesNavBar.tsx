import { Button, HStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

interface Props {
  baseUrl: string
}
const RulesNavBar = ({ baseUrl }: Props) => {
  const navigation = useNavigate()
  const handleAddRule = () => {
    navigation("/editRule", {
      state: {
        baseUrl,
        mode: "add"
      }
    })
  }
  const onBack = () => {
    navigation(-1)
  }
  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" padding="10px">
        <HStack alignItems="center">
          {/* <Text fontSize="medium" fontWeight="bold">
            Rules
          </Text>
          <Input placeholder="Basic usage" /> */}
        </HStack>
        <HStack>
          <Button onClick={onBack} colorScheme="teal">
            Back
          </Button>
          <Button onClick={handleAddRule} colorScheme="teal">
            New Rule
          </Button>
        </HStack>
      </HStack>
    </>
  )
}

export default RulesNavBar
