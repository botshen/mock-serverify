import React, { useEffect, useRef } from "react"
import { JSONEditor } from "vanilla-jsoneditor"

import "./json.css"

import { useColorMode } from "@chakra-ui/react"

interface Props {
  readOnly?: boolean
  onChange?: (value: any) => void
  mode: any
  content: any
  mainMenuBar?: boolean
  statusBar?: boolean
}

export default function ResponseEditors(props: Props) {
  const refContainer = useRef<HTMLDivElement | null>(null)
  const refEditor = useRef<JSONEditor | null>(null)
  const { colorMode } = useColorMode()
  useEffect(() => {
    if (refContainer.current) {
      refContainer.current.className = `jse-theme-${colorMode}`
    }
  }, [colorMode])
  useEffect(() => {
    refEditor.current = new JSONEditor({
      target: refContainer.current!,
      props: {}
    })

    return () => {
      if (refEditor.current) {
        refEditor.current.destroy()
        refEditor.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (refEditor.current) {
      refEditor.current.updateProps(props)
    }
  }, [props.content])

  return <div ref={refContainer}></div>
}
