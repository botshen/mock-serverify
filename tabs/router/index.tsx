import { createHashRouter, Navigate } from "react-router-dom"

import Logs from "~tabs/log"
import Main from "~tabs/main"
import ProjectList from "~tabs/projectList"

export const globalRouters = createHashRouter([
  {
    path: "/",
    element: (
      <>
        <Main />
      </>
    ),
    children: [
      {
        path: "projectList",
        element: <ProjectList />
      },
      {
        path: "logs",
        element: <Logs />
      },
      {
        // 如果URL没有"#路由"，跳转Home页面
        path: "/",
        element: <Navigate to="/projectList" />
      },
      {
        path: "*",
        element: <Navigate to="/projectList" />
      }
    ]
  }
  // {
  //   // 未匹配"/login"，全部进入到entry路由
  //   path: "/",
  //   element: <Entry />,
  //   // 定义entry二级路由
  //   children: [
  //     {
  //       // 精确匹配"/home"，跳转Home页面
  //       path: "/home",
  //       element: <Home />
  //     },
  //     {
  //       // 精确匹配"/account"，跳转Account页面
  //       path: "/account",
  //       element: <Account />
  //     },
  //     {
  //       // 如果URL没有"#路由"，跳转Home页面
  //       path: "/",
  //       element: <Navigate to="/home" />
  //     },
  //     {
  //       // 未匹配，跳转Login页面
  //       path: "*",
  //       element: <Navigate to="/home" />
  //     }
  //   ]
  // }
])
