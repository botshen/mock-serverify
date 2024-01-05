interface Window {
  hello: {
    world: string
    coolNumber: number
  }

  mainMessage: string
}
interface RuleType {
  pathRule: string
  Method: string
  Delay: string
  code: string
  Comments: string
  switchOn?: boolean
  json: {
    name: string
    age: number
    isStudent: boolean
  }
}

interface ProjectType {
  name: string
  baseUrl: string
  description: string
  rules?: Rule[]
  switchOn?: boolean
}

interface Log {
  pathRule: string
  status: string
  mock: string
  type: string
  method: string
  Response: string
  origin: string
  switchOn: boolean
  url: string
  mockTime: number
  requestHeaders: {
    accept: string
    "content-type": string
  }
  responseHeaders: {
    "content-length": string
    "content-type": string
  }
}

interface Domain {
  apiLogList: Log[]
  clearLogList: () => void
  addApiLogList: (apiLog: Log) => void
}
declare module "*.png" {
  const value: string
  export = value
}
