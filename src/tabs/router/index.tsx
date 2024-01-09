import { createHashRouter, Navigate } from "react-router-dom"

import About from "~tabs/about"
import RuleEditor from "~tabs/components/RuleEditor"
import Logs from "~tabs/Logs"
import Main from "~tabs/main"
import ProjectList from "~tabs/projectList"
import SavedRules from "~tabs/savedRules"
import Setting from "~tabs/setting"

export const globalRouters = createHashRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "savedRules",
        element: <SavedRules />
      },
      {
        path: "editRule",
        element: <RuleEditor />
      },

      {
        path: "projectList",
        element: <ProjectList />
      },
      {
        path: "settings",
        element: <Setting />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "logs",
        element: <Logs />
      },
      {
        path: "/",
        element: <Navigate to="/projectList" />
      },
      {
        path: "*",
        element: <Navigate to="/projectList" />
      }
    ]
  }
])
