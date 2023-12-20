import {
  MemoryRouter,
  Outlet,
  RouterProvider,
  useLocation,
  useNavigate
} from "react-router-dom"

import "../assets/style.scss"

import NavBar from "./components/nav"

const menu = [
  {
    name: "首页",
    path: "/",
    icon: "home"
  },
  {
    name: "表格",
    path: "/table",
    icon: "table"
  },
  {
    name: "图表",
    path: "/chart",
    icon: "chart"
  },
  {
    name: "log",
    path: "/tabs/delta-flyer.html/#/table",
    icon: "form"
  }
]
export default function Main() {
  const navigation = useNavigate()

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        <NavBar />
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <div>
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>
          {/* {menu.map(({ name, path, icon }) => (
              <li key={path}>
                <a className="active" href={path}>
                  {name}
                </a>
              </li>
            ))} */}
          <li>
            <a onClick={() => navigation("/projectList")}>项目列表</a>
          </li>
          <li>
            <a onClick={() => navigation("/logs")}>拦截日志列表</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
