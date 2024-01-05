import { Checkbox, FormControl, FormHelperText } from "@chakra-ui/react"
import React from "react"

const Setting = () => {
  return (
    <div>
      <FormControl>
        <Checkbox
          marginRight="10px"
          size="lg"
          colorScheme="orange"
          defaultChecked>
          Terminal log
        </Checkbox>
        <Checkbox
          marginRight="10px"
          size="lg"
          colorScheme="orange"
          defaultChecked>
          Toast log
        </Checkbox>
        <Checkbox
          marginRight="10px"
          size="lg"
          colorScheme="orange"
          defaultChecked>
          Transmission to the back-end
        </Checkbox>
        <Checkbox
          marginRight="10px"
          size="lg"
          colorScheme="orange"
          defaultChecked>
          Global switch
        </Checkbox>
        <FormHelperText>Effective immediately after operation.</FormHelperText>
      </FormControl>
    </div>
  )
}

export default Setting
