import EmailPage from "./pages/EmailPage/Index";
import SMTPSettings from "./pages/SmtpPage/SMTPSettings";
import SendOut from "./pages/SendOut/SendOut";
import Letters from "./pages/LetterPage/LetterPage";
import Logs from "./pages/LogPage/Log";

const routes = [
  { path: "/", element: <SendOut /> },
  { path: "/emails", element: <EmailPage /> },
  { path: "/smtps", element: <SMTPSettings /> },
   { path: "/letters", element: <Letters /> },
   { path: "/logs", element: <Logs /> },
  
];

export default routes;