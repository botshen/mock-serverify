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
import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Url from "url-parse"

import { useStorage } from "@plasmohq/storage/hook"

import { defaultValueFunction, storageConfig } from "~tabs/store"

import ResponseEditors from "./ResponseEditor"

const RuleEditor = () => {
  const { baseUrl, pathRule, mode, row } = useLocation().state
  const navigation = useNavigate()
  const [projects, setProjects] = useStorage<ProjectType[]>(
    storageConfig,
    defaultValueFunction
  )
  const validateName = (value: string) => {
    let error: string
    if (!value) {
      error = "Value is required"
    }
    return error
  }
  const validateComment = (value: string) => {
    let error: string

    return error
  }
  const validateDelayName = (value: number) => {
    let error: string
    if (!value && value !== 0) {
      error = "Value is required"
    }
    if (isNaN(Number(value))) {
      error = "Value is not a number"
    }
    return error
  }
  const handleCancel = () => {
    navigation(-1)
  }
  const geneRule = useMemo(() => {
    if (mode === "add") {
      return {
        pathRule: "",
        Method: "",
        Delay: "",
        code: "",
        Comments: ""
      }
    } else if (mode === "log") {
      console.log("row", row)
      return {
        pathRule: row.url,
        Method: row.method,
        Delay: 0,
        code: row.status,
        Comments: ""
      }
    } else {
      if (projects.length !== 0) {
        return projects
          ?.find((i) => i.baseUrl === baseUrl)
          ?.rules?.find((i) => i.pathRule === pathRule)
      }
    }
  }, [mode, projects])

  const jsonDataMemo = useMemo(() => {
    console.log("mode", mode)
    if (mode === "add") {
      return {
        json: {},
        text: undefined,
        textAreaValue: jsonData
      }
    } else if (mode === "log") {
      console.log("row.Response", row.Response)
      const jsonData = row.Response
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
    } else {
      const json = projects
        ?.find((i) => i.baseUrl === baseUrl)
        ?.rules?.find((i) => i.pathRule === pathRule)?.json
      let result
      console.log("json", json)
      if (json) {
        result = {
          json: json,
          text: undefined,
          textAreaValue: undefined
        }
      } else {
        result = {
          json: {},
          text: undefined,
          textAreaValue: undefined
        }
      }

      return result
    }
  }, [mode, projects])
  useEffect(() => {
    setJsonData(jsonDataMemo)
  }, [jsonDataMemo])
  const [jsonData, setJsonData] = useState(jsonDataMemo)
  const updateRule = (formData: any) => {
    chrome.tabs.query({}, function (tabs) {
      const targetTabId = tabs.find((i) => new Url(i.url).origin === baseUrl)
        ?.id
      if (targetTabId) {
        chrome.tabs.sendMessage(targetTabId, {
          type: "updateRules",
          payload: {
            baseUrl,
            formData
          }
        })
      }
    })
  }
  return (
    <>
      <VStack padding="20px" height="500px">
        {geneRule && (
          <Formik
            initialValues={{
              pathRule: geneRule.pathRule,
              Method: geneRule.Method,
              Delay: geneRule.Delay,
              code: geneRule.code,
              Comments: geneRule.Comments
            }}
            onSubmit={async (values, actions) => {
              let json
              if (jsonData.json) {
                json = jsonData.json
              } else {
                json = JSON.parse(jsonData.text)
              }
              const formData = {
                ...values,
                json
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
              if (mode === "log") {
                const _val = projects.map((item) => {
                  if (item.baseUrl === baseUrl) {
                    if (!item.rules) item.rules = []
                    //如果之前存在相同的pathRule，进行替换
                    const isExist = item.rules.find(
                      (i) => i.pathRule === formData.pathRule
                    )
                    if (isExist) {
                      item.rules = item.rules.map((i) => {
                        if (i.pathRule === formData.pathRule) {
                          return formData
                        }
                        return i
                      })
                      alert(
                        "The pathRule already exists and has been overwritten"
                      )
                    } else {
                      item.rules.push(formData)
                    }
                  }
                  return item
                })
                setProjects(_val)
              }
              if (mode === "log") {
                updateRule(formData)
                navigation("../savedRules", {
                  state: projects?.find(
                    (project) => project.baseUrl === baseUrl
                  )
                })
                actions.setSubmitting(false)
                return
              }
              updateRule(formData)
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
                            disabled={mode === "edit"}
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
                            <option value="GET">get</option>
                            <option value="POST">post</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.Method}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box>
                    <Field name="Delay" validate={validateDelayName}>
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
                    <Field name="Comments" validate={validateComment}>
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
                  content={jsonData}
                  readOnly={false}
                  mode="text"
                  onChange={setJsonData}
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
