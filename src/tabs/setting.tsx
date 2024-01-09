import { Checkbox, FormControl, FormHelperText } from "@chakra-ui/react"
import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { defaultSettings, storageSettings } from "./store"

const Setting = () => {
  const [setting, setSetting] = useStorage(storageSettings, defaultSettings)
  const handleSettingChange = (key: string, value: any) => {
    setSetting({ ...setting, [key]: value })
  }
  return (
    <div>
      <FormControl>
        <Checkbox
          marginRight="10px"
          isChecked={setting.terminalLog}
          onChange={(e) => handleSettingChange("terminalLog", e.target.checked)}
          size="lg"
          colorScheme="orange">
          Terminal log
        </Checkbox>
        <Checkbox
          marginRight="10px"
          size="lg"
          isChecked={setting.toastLog}
          onChange={(e) => handleSettingChange("toastLog", e.target.checked)}
          colorScheme="orange">
          Toast log
        </Checkbox>
        <Checkbox
          marginRight="10px"
          size="lg"
          colorScheme="orange"
          isChecked={setting.transmission}
          onChange={(e) =>
            handleSettingChange("transmission", e.target.checked)
          }>
          Transmission to the back-end
        </Checkbox>
        <Checkbox
          marginRight="10px"
          size="lg"
          isChecked={setting.globalSwitch}
          onChange={(e) =>
            handleSettingChange("globalSwitch", e.target.checked)
          }
          colorScheme="orange">
          Global switch
        </Checkbox>
        <FormHelperText>Effective immediately after operation.</FormHelperText>
      </FormControl>
    </div>
  )
}

export default Setting
