import { useLocation } from "react-router-dom"

import "../assets/style.scss"

import Tables from "./components/table"

export default function Logs() {
  const location = useLocation()
  console.log(location.pathname)
  return (
    <>
      <h1>拦截日志</h1>
      <Tables></Tables>
    </>
  )
}
