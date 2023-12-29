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
import { Field, Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"

import { useStorage } from "@plasmohq/storage/hook"

import { defaultValueFunction, storageConfig } from "~tabs/store"

const ProjectNavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [projects, setProjects] = useStorage<ProjectType[]>(
    storageConfig,
    defaultValueFunction
  )
  const toast = useToast()

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
    } else if (!value.startsWith("http://") && !value.startsWith("https://")) {
      error = "BaseUrl must be a valid url"
    } else if (projects.find((project) => project.baseUrl === value)) {
      error = "baseUrl already exists"
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

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" padding="10px">
        <HStack alignItems="center">
          {/* <Text fontSize="medium" fontWeight="bold">
            Rules
          </Text>
          <Input placeholder="Basic usage" /> */}
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
              initialValues={{ name: "", baseUrl: "http://", description: "" }}
              onSubmit={(values, actions) => {
                setProjects(projects.concat(values))
                actions.setSubmitting(false)
                onClose()
                toast({
                  title: "Modification successful",
                  position: "top",
                  isClosable: true,
                  containerStyle: {
                    fontSize: "1.2rem"
                  }
                })
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
                  <Field name="description" validate={validateDesc}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.desc && form.touched.description
                        }>
                        <FormLabel>Description</FormLabel>
                        <Input {...field} placeholder="description" />
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
