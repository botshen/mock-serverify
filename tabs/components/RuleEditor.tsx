import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Spacer,
  Switch,
  VStack
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useStorage } from "@plasmohq/storage/hook"

import ResponseEditors from "./ResponseEditor"

const RuleEditor = () => {
  const { baseUrl, pathRule, mode } = useLocation().state
  const navigation = useNavigate()
  const [projects, setProjects] = useStorage<ProjectType[]>(
    "mock_genius_projects"
  )

  const geneRule = () => {
    if (mode === "add") {
      return {
        pathRule: "",
        Method: "",
        Delay: "",
        code: "",
        Comments: ""
      }
    } else {
      return projects
        ?.find((i) => i.baseUrl === baseUrl)
        ?.rules?.find((i) => i.pathRule === pathRule)
    }
  }

  const validateName = (value: string) => {
    let error: string
    if (!value) {
      error = "Name is required"
    }
    return error
  }
  const handleCancel = () => {
    navigation(-1)
  }
  const jsonData = geneRule()?.json ?? {}
  const [content, setContent] = useState(() => {
    if (!jsonData) {
      return {
        json: undefined,
        text: "",
        textAreaValue: ""
      }
    }
    if (typeof jsonData === "object") {
      return {
        json: jsonData,
        text: undefined,
        textAreaValue: JSON.stringify(jsonData)
      }
    } else {
      try {
        const parse = JSON.parse(jsonData)
        return {
          json: parse,
          text: undefined,
          textAreaValue: jsonData
        }
      } catch (error) {
        return {
          json: undefined,
          text: jsonData,
          textAreaValue: jsonData
        }
      }
    }
  })
  return (
    <>
      <VStack padding="20px" height="500px">
        {geneRule() && (
          <Formik
            initialValues={{
              pathRule: geneRule().pathRule,
              Method: geneRule().Method,
              Delay: geneRule().Delay,
              code: geneRule().code,
              Comments: geneRule().Comments
            }}
            onSubmit={(values, actions) => {
              const formData = {
                ...values,
                json: content.json
              }
              const isExist = projects
                ?.find((i) => i.baseUrl === baseUrl)
                ?.rules?.find((i) => i.pathRule === formData.pathRule)
              if (isExist && mode === "add") {
                alert("已经存在相同的pathRule")
                actions.setSubmitting(false)
                return
              }
              console.log("mode", mode)
              if (mode === "add") {
                setProjects(
                  projects.map((item) => {
                    if (item.baseUrl === baseUrl) {
                      if (!item.rules) item.rules = []
                      item.rules.push(formData)
                    }
                    return item
                  })
                )
              }
              if (mode === "edit") {
                setProjects(
                  projects.map((item) => {
                    if (item.baseUrl === baseUrl) {
                      item.rules = item.rules.map((i) => {
                        if (i.pathRule === pathRule) {
                          return formData
                        }
                        return i
                      })
                    }
                    return item
                  })
                )
              }
              actions.setSubmitting(false)
              handleCancel()
            }}>
            {(props) => (
              <Form>
                <Grid
                  marginBottom="20px"
                  templateColumns={{
                    base: "1fr",
                    md: "repeat(5, 1fr)"
                  }}
                  gap={4}>
                  <Box>
                    <Field name="pathRule" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.pathRule && form.touched.pathRule
                          }>
                          <FormLabel>pathRule</FormLabel>
                          <Input
                            {...field}
                            disabled={true}
                            placeholder="pathRule"
                          />
                          <FormErrorMessage>
                            {form.errors.pathRule}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box>
                    <Field name="Method" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.Method && form.touched.Method}>
                          <FormLabel>Method</FormLabel>
                          <Select {...field} placeholder="Select option">
                            <option value="get">get</option>
                            <option value="post">post</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.Method}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box>
                    <Field name="Delay" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.Delay && form.touched.Delay}>
                          <FormLabel>Delay</FormLabel>
                          <InputGroup>
                            <Input {...field} placeholder="mysite" />
                            <InputRightAddon>ms</InputRightAddon>
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.Delay}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box>
                    <Field name="code" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.code && form.touched.code}>
                          <FormLabel>code</FormLabel>
                          <Select {...field} placeholder="Select option">
                            <option value="200">200</option>
                            <option value="404">404</option>
                            <option value="500">500</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.code}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box>
                    <Field name="Comments" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.Comments && form.touched.Comments
                          }>
                          <FormLabel>Comments</FormLabel>
                          <Input {...field} placeholder="名字" />
                          <FormErrorMessage>
                            {form.errors.Comments}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </Grid>
                <ResponseEditors
                  content={content}
                  readOnly={false}
                  onChange={setContent}
                  mode="text"
                  mainMenuBar={false}
                  statusBar={false}
                />
                <HStack mt={4} mb={4}>
                  <Spacer />
                  <Button onClick={handleCancel}>cancel</Button>
                  <Button
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit">
                    submit
                  </Button>
                </HStack>
              </Form>
            )}
          </Formik>
        )}
      </VStack>
    </>
  )
}

export default RuleEditor
