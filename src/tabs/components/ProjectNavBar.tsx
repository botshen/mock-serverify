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
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"

import { useStorage } from "@plasmohq/storage/hook"

import {
  defaultCurrent,
  defaultValueFunction,
  storageConfig,
  storageCurrentConfig
} from "~tabs/store"
import { useLogStore } from "~tabs/store/useLogStore"
import { removeTrailingSlash } from "~util/utils"

const ProjectNavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigation = useNavigate()

  const [projects, setProjects] = useStorage<ProjectType[]>(
    storageConfig,
    defaultValueFunction
  )
  const [curProjects, setCurProjects] = useStorage<string>(
    storageCurrentConfig,
    defaultCurrent
  )
  const { clearLogList } = useLogStore()

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
    if (value && value.length > 20) {
      error = "Description must be less than 20 characters"
    }
    return error
  }
  const navigateRule = (baseUrl: string) => {
    setCurProjects(baseUrl)
    if (curProjects !== baseUrl) {
      clearLogList()
    }
    navigation("/savedRules", {
      state: { baseUrl }
    })
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
                const betterBaseUrl = removeTrailingSlash(values.baseUrl)
                const formData = {
                  ...values,
                  rules: [],
                  switchOn: true,
                  baseUrl: betterBaseUrl
                }
                setProjects(projects.concat(formData))
                actions.setSubmitting(false)
                onClose()
                toast({
                  title: "Add Successful And Switch Current Url",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                  position: "top",
                  containerStyle: {
                    width: "400px",
                    maxWidth: "100%",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    fontSize: "1rem"
                  }
                })
                navigateRule(betterBaseUrl)
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
                          form.errors.description && form.touched.description
                        }>
                        <FormLabel>Description</FormLabel>
                        <Input {...field} placeholder="description" />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
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
