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
  useDisclosure
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"

const ProjectNavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigation = useNavigate()

  const validateName = (value) => {
    let error
    if (!value) {
      error = "Name is required"
    }
    return error
  }
  const validateBaseUrl = (value) => {
    let error
    if (!value) {
      error = "BaseUrl is required"
    }
    return error
  }
  const validateDesc = (value) => {
    let error
    if (value && value.length > 5) {
      error = "Description must be less than 5 characters"
    }
    return error
  }
  const onNavigate = (url: string) => {
    navigation(url + "/create")
  }
  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" padding="10px">
        <HStack alignItems="center">
          <Text fontSize="medium" fontWeight="bold">
            Rules
          </Text>
          <Input placeholder="Basic usage" />
        </HStack>
        <Button onClick={onOpen} colorScheme="blue">
          New Project
        </Button>
      </HStack>
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ name: "", baseUrl: "", desc: "" }}
              onSubmit={(values, actions) => {
                // setTimeout(() => {
                //   // ToDo 存储

                // }, 1000)
                // onNavigate(values.baseUrl)

                actions.setSubmitting(false)
              }}>
              {(props) => (
                <Form>
                  <Field name="name" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel>Project name</FormLabel>
                        <Input {...field} placeholder="name" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="baseUrl" validate={validateBaseUrl}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.baseUrl && form.touched.baseUrl}>
                        <FormLabel>BaseUrl</FormLabel>
                        <Input {...field} placeholder="baseUrl" />
                        <FormErrorMessage>
                          {form.errors.baseUrl}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="desc" validate={validateDesc}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.desc && form.touched.desc}>
                        <FormLabel>Desc</FormLabel>
                        <Input {...field} placeholder="desc" />
                        <FormErrorMessage>{form.errors.desc}</FormErrorMessage>
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
    </>
  )
}

export default ProjectNavBar
