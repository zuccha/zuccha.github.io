import { React, ReactRouterDOM } from "../../deps.ts";
import CourtesyMessage from "../components/CourtesyMessage.tsx";
import GuideViewer from "../components/GuideViewer.tsx";
import NavigationBar from "../components/NavigationBar.tsx";
import useResource from "../hooks/useResource.ts";

function identity<T>(t: T): T {
  return t;
}

const GuideRouteMd = () => {
  const location = ReactRouterDOM.useLocation();

  const pathnames = location.pathname.split("/");
  const name = pathnames[pathnames.length - 1];

  const [guide, status] = useResource(`/static/guides/${name}.md`, identity);

  if (status === "initial" || status === "loading") {
    document.title = "Loading...";
    return null;
  }

  if (status === "failure") {
    document.title = "Guide error";
    return (
      <CourtesyMessage
        title="The guide is not valid :("
        button={{ label: "HOME", href: "/" }}
      />
    );
  }

  document.title = "guide.getName();";
  console.log(guide);

  return (
    <div className="guide-route">
      <NavigationBar backUrl="/" />

      <div className="guide-route-content">
        <div className="guide-route-guide">
          <GuideViewer markdown={guide} />
        </div>
      </div>
    </div>
  );
};

export default GuideRouteMd;
