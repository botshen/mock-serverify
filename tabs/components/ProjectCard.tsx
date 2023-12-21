import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"

interface Props {
  name: string
  description: string
  baseUrl?: string
}
const ProjectCard = ({ name, description, baseUrl }: Props) => {
  const navigation = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const validateName = (value) => {
    let error
    if (!value) {
      error = "Name is required"
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱"
    }
    return error
  }
  const handleCardClick = () => {
    navigation(name)
  }
  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation()
    onOpen()
  }
  return (
    <Card borderRadius={10} cursor="pointer" onClick={handleCardClick}>
      <CardBody>
        <Heading fontSize="16px">{name}</Heading>
        <Text fontSize="md">{baseUrl}</Text>
        <Text>{description}</Text>
        <HStack marginTop="20px" justifyContent="space-between">
          <Button
            width="50%"
            onClick={(event) => handleDelete(event)}
            colorScheme="red"
            variant="ghost">
            delete
          </Button>
          <Button
            width="50%"
            onClick={(event) => handleDelete(event)}
            colorScheme="teal"
            variant="ghost">
            edit
          </Button>
        </HStack>
      </CardBody>
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ name: "Sasuke" }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2))
                  actions.setSubmitting(false)
                }, 1000)
              }}>
              {(props) => (
                <Form>
                  <Field name="name" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel>First name</FormLabel>
                        <Input {...field} placeholder="name" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <HStack>
                    <Spacer />
                    <Button
                      mt={4}
                      mb={4}
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit">
                      Submit
                    </Button>
                  </HStack>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  )
}

export default ProjectCard
