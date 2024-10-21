import { Guider, React, ReactRouterDOM } from "../../deps.ts";
import CourtesyMessage from "../components/CourtesyMessage.tsx";
import GuideFilters from "../components/GuideFilters.tsx";
import GuideViewer from "../components/GuideViewer.tsx";
import NavigationBar from "../components/NavigationBar.tsx";
import useResource from "../hooks/useResource.ts";

type SearchParams = {
  hideComments: boolean;
  hideOptional: boolean;
  hideSafety: boolean;
  ignoredRules: number[];
};

const formatUrl = (location: string, options: SearchParams): string => {
  const params: string[] = [];
  if (options.hideComments) params.push("hide-comments");
  if (options.hideOptional) params.push("hide-optional");
  if (options.hideSafety) params.push("hide-safety");
  if (options.ignoredRules.length > 0)
    params.push(
      `ignored-rules=${options.ignoredRules.map((rule) => `${rule}`).join(",")}`
    );
  return params.length === 0
    ? `/#${location}`
    : `/#${location}?${params.join("&")}`;
};

const GuideRouteJson = () => {
  const location = ReactRouterDOM.useLocation();

  const pathnames = location.pathname.split("/");
  const name = pathnames[pathnames.length - 1];

  const [options, setOptions] = React.useState(() => {
    const searchParams = new URLSearchParams(location.search.substring(1));

    const ignoredRules = searchParams.has("ignored-rules")
      ? searchParams
          .get("ignored-rules")!
          .split(",")
          .map((rule) => (isNaN(Number(rule)) ? -1 : Number(rule)))
          .filter((rule) => rule !== -1)
      : [];

    const hideOptional = searchParams.has("hide-optional");
    const hideSafety = searchParams.has("hide-safety");
    const hideComments = searchParams.has("hide-comments");

    return {
      collapseInstructionGroups: true,
      hideComments,
      hideInstructionId: true,
      hideOptional,
      hideSafety,
      ignoredRules,
    };
  });

  const parseGuide = React.useCallback(
    (data: string): Guider.Guide<Guider.GenericInstruction> => {
      try {
        return Guider.parseGuide(data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    []
  );

  const [guide, status] = useResource(
    `/static/guides/${name}.json`,
    parseGuide
  );

  const rules = React.useMemo(() => {
    return guide ? guide.getRules({ isImpactful: true }) : [];
  }, [guide]);

  const handleToggleHideComments = React.useCallback(() => {
    setOptions((prevOptions) => {
      const hideComments = !prevOptions.hideComments;
      const nextOptions = { ...prevOptions, hideComments };
      const url = formatUrl(location.pathname, nextOptions);
      history.replaceState(history.state, "", url);
      return nextOptions;
    });
  }, [location.pathname]);

  const handleToggleHideOptional = React.useCallback(() => {
    setOptions((prevOptions) => {
      const hideOptional = !prevOptions.hideOptional;
      const nextOptions = { ...prevOptions, hideOptional };
      const url = formatUrl(location.pathname, nextOptions);
      history.replaceState(history.state, "", url);
      return nextOptions;
    });
  }, [location.pathname]);

  const handleToggleHideSafety = React.useCallback(() => {
    setOptions((prevOptions) => {
      const hideSafety = !prevOptions.hideSafety;
      const nextOptions = { ...prevOptions, hideSafety };
      const url = formatUrl(location.pathname, nextOptions);
      history.replaceState(history.state, "", url);
      return nextOptions;
    });
  }, [location.pathname]);

  const handleToggleIgnoredRule = React.useCallback(
    (rule: number) => {
      setOptions((prevOptions) => {
        const ignoredRules = prevOptions.ignoredRules.includes(rule)
          ? prevOptions.ignoredRules.filter((other) => other !== rule)
          : [...prevOptions.ignoredRules, rule];
        const nextOptions = { ...prevOptions, ignoredRules };
        const url = formatUrl(location.pathname, nextOptions);
        history.replaceState(history.state, "", url);
        return nextOptions;
      });
    },
    [location.pathname]
  );

  const [hideFilters, setHideFilters] = React.useState(true);

  const toggleFilters = React.useCallback(() => {
    setHideFilters((prevHideFilters) => !prevHideFilters);
  }, []);

  const navigationBarActions = React.useMemo(
    () => [
      { label: "Filters", onClick: toggleFilters, isActive: !hideFilters },
    ],
    [hideFilters, toggleFilters]
  );

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

  document.title = guide.getName();

  return (
    <div className="guide-route">
      <NavigationBar
        backUrl="/"
        actions={navigationBarActions}
        contentBelow={
          <div
            className={
              hideFilters ? "guide-route-filters hidden" : "guide-route-filters"
            }
          >
            <GuideFilters
              hideComments={options.hideComments}
              hideOptional={options.hideOptional}
              hideSafety={options.hideSafety}
              ignoredRules={options.ignoredRules}
              rules={rules}
              onToggleHideComments={handleToggleHideComments}
              onToggleHideOptional={handleToggleHideOptional}
              onToggleHideSafety={handleToggleHideSafety}
              onToggleIgnoredRule={handleToggleIgnoredRule}
            />
          </div>
        }
      />

      <div className="guide-route-content">
        <div className="guide-route-guide">
          <GuideViewer markdown={guide.format(options)} />
        </div>
      </div>
    </div>
  );
};

export default GuideRouteJson;
