import { createStandaloneToast } from "@chakra-ui/react"

const { ToastContainer, toast } = createStandaloneToast()
const MockToast = () => {
  window.addEventListener(
    "toast",
    (event: CustomEvent<{ message: string }>) => {
      toast({
        title: "Mock Success.",
        description: `URL:${event.detail.message}.`,
        status: "success",
        duration: 1200,
        isClosable: true,
        position: "bottom-right",
        containerStyle: {
          width: "400px",
          maxWidth: "100%",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all"
        }
      })
    }
  )
  return (
    <div>
      <ToastContainer />
    </div>
  )
}

export default MockToast
