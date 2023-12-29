import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
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
          <Button onClick={onBack} colorScheme="blue">
            Back
          </Button>
          <Button onClick={handleAddRule} colorScheme="blue">
            New Rule
          </Button>
        </HStack>
      </HStack>
    </>
  )
}

export default RulesNavBar
