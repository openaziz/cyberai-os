import { createBrowserRouter } from "react-router-dom"
import HomePage from "./page"
import ChatPage from "./chat/page"
import ModelsPage from "./models/page"
import TerminalPage from "./terminal/page"
import SetupPage from "./setup/page"
import ModelTrainingPage from "./training/page"
import LoginPage from "./login/page"
import HelpPage from "./help/page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/models",
    element: <ModelsPage />,
  },
  {
    path: "/terminal",
    element: <TerminalPage />,
  },
  {
    path: "/setup",
    element: <SetupPage />,
  },
  {
    path: "/training",
    element: <ModelTrainingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/help",
    element: <HelpPage />,
  },
])

export default router
