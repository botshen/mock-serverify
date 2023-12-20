import { useLocation } from "react-router-dom"

import "../assets/style.scss"

export default function ProjectList() {
  const location = useLocation()
  console.log(location.pathname)
  return (
    <>
      <h1>项目列表</h1>
    </>
  )
}
