import { React } from "../../deps.ts";
import CourtesyMessage from "../components/CourtesyMessage.tsx";

const NotFoundRoute = () => {
  document.title = "Page Not Found";

  return (
    <CourtesyMessage
      title="Page not found"
      button={{ label: "HOME", href: "/" }}
    />
  );
};

export default NotFoundRoute;
