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
  rules: Rule[]
}
declare module "*.png" {
  const value: string
  export = value
}
