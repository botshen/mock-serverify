import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
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
import React from "react"
import { useNavigate } from "react-router-dom"

import { useStorage } from "@plasmohq/storage/hook"

import {
  defaultCurrent,
  defaultValueFunction,
  storageConfig,
  storageCurrentConfig
} from "~tabs/store"
import { useLogStore } from "~tabs/store/useLogStore"

interface Props {
  name: string
  description: string
  baseUrl?: string
}
const ProjectCard = ({ name, description, baseUrl }: Props) => {
  const navigation = useNavigate()
  const cancelRef = React.useRef()
  const { clearLogList } = useLogStore()

  const [projects, setProjects] = useStorage<ProjectType[]>(
    storageConfig,
    defaultValueFunction
  )
  const [curProjects, setCurProjects] = useStorage<string>(
    storageCurrentConfig,
    defaultCurrent
  )
  const toast = useToast()
  const modals = {
    modal1: useDisclosure(),
    modal2: useDisclosure()
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const validateName = (value) => {
    let error
    if (!value) {
      error = "Name is required"
    }
    return error
  }
  const handleCardClick = () => {
    setCurProjects(baseUrl)
    if (curProjects !== baseUrl) {
      // reset logs if switch to another project
      clearLogList()
    }
    navigation("../savedRules", {
      state: projects?.find((project) => project.baseUrl === baseUrl)
    })
  }
  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation()
    onOpen()
  }
  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation()
    modals.modal2.onOpen()
  }
  const handleDeleteProject = () => {
    setProjects(
      projects.filter((item: { baseUrl: string }) => item.baseUrl !== baseUrl)
    )
    modals.modal2.onClose()
    toast({
      title: "Modification successful",
      position: "top",
      isClosable: true,
      containerStyle: {
        fontSize: "1.2rem"
      }
    })
  }
  return (
    <Card borderRadius={10} cursor="pointer" onClick={handleCardClick}>
      <CardBody
        display="flex"
        flexDirection="column"
        justifyContent="space-between">
        <div>
          <Text fontSize="16px"> NAME : {name}</Text>
          <Text fontSize="16px">BASEURL: {baseUrl}</Text>
          <Text fontSize="16px">DESCRIPTION: {description || "none"}</Text>
        </div>
        <HStack justifyContent="space-between">
          <Button
            width="50%"
            onClick={(event) => handleDelete(event)}
            colorScheme="red"
            variant="ghost">
            delete
          </Button>
          <Button
            width="50%"
            onClick={(event) => handleEdit(event)}
            colorScheme="teal"
            variant="ghost">
            edit
          </Button>
        </HStack>
      </CardBody>
      <AlertDialog
        isOpen={modals.modal2.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={modals.modal2.onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Project
            </AlertDialogHeader>
            <AlertDialogBody fontSize="lg">
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={modals.modal2.onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteProject} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ name, description, baseUrl }}
              onSubmit={(values, actions) => {
                const result = projects.map((project) =>
                  project.baseUrl === baseUrl
                    ? { ...project, ...values, switchOn: true }
                    : { ...project, switchOn: true }
                )
                setProjects(result)
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
                        <FormLabel>name</FormLabel>
                        <Input {...field} placeholder="name" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="description" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }>
                        <FormLabel>description</FormLabel>
                        <Input {...field} placeholder="description" />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="baseUrl" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.baseUrl && form.touched.baseUrl}>
                        <FormLabel>url</FormLabel>
                        <Input disabled {...field} placeholder="baseUrl" />
                        <FormErrorMessage>
                          {form.errors.baseUrl}
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
    </Card>
  )
}

export default ProjectCard
