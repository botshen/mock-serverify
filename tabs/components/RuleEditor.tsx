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
  InputLeftAddon,
  InputRightAddon,
  Select,
  Spacer,
  Switch,
  Text
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { useLocation, useNavigate } from "react-router-dom"

const RuleEditor = () => {
  const { baseUrl } = useLocation().state
  console.log(
    "%c [ baseUrl ]-23",
    "font-size:13px; background:pink; color:#bf2c9f;",
    baseUrl
  )
  const navigation = useNavigate()
  const projectInfo = useLocation().state

  const validateName = (value) => {
    let error
    if (!value) {
      error = "Name is required"
    }
    return error
  }
  const handleCancel = () => {
    navigation(-1)
  }

  return (
    <>
      <HStack padding="20px">
        <Formik
          initialValues={{
            name1: "Sasuke",
            name2: "",
            name3: "" /* 根据需要添加更多唯一名称 */
          }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              actions.setSubmitting(false)
            }, 1000)
          }}>
          {(props) => (
            <Form>
              <Grid
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                gap={4}>
                <Box>
                  <Field name="switchOn" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.switchOn && form.touched.switchOn
                        }>
                        <FormLabel>switchOn</FormLabel>
                        <Switch {...field} colorScheme="blue" />
                        <FormErrorMessage>{form.errors.name1}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>

                <Box>
                  <Field name="name2" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name2 && form.touched.name2}>
                        <FormLabel>pathRule</FormLabel>
                        <Input {...field} placeholder="名字" />
                        <FormErrorMessage>{form.errors.name2}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>

                <Box>
                  <Field name="name3" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name3 && form.touched.name3}>
                        <FormLabel>Method</FormLabel>
                        <Select {...field} placeholder="Select option">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                        <FormErrorMessage>{form.errors.name3}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box>
                  <Field name="name3" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name3 && form.touched.name3}>
                        <FormLabel>Delay</FormLabel>
                        <InputGroup size="sm">
                          <Input {...field} placeholder="mysite" />
                          <InputRightAddon>ms</InputRightAddon>
                        </InputGroup>
                        <FormErrorMessage>{form.errors.name3}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box>
                  <Field name="name3" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name3 && form.touched.name3}>
                        <FormLabel>code</FormLabel>
                        <Select {...field} placeholder="Select option">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                        <FormErrorMessage>{form.errors.name3}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box>
                  <Field name="name3" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name3 && form.touched.name3}>
                        <FormLabel>Comments</FormLabel>
                        <Input {...field} placeholder="名字" />
                        <FormErrorMessage>{form.errors.name3}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </Grid>

              <HStack mt={4} mb={4}>
                <Spacer />
                <Button
                  onClick={handleCancel}
                  isLoading={props.isSubmitting}
                  type="submit">
                  cancel
                </Button>
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
        <Text fontSize="6xl">json edit</Text>
      </HStack>
    </>
  )
}

export default RuleEditor
