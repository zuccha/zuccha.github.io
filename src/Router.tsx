import { React, ReactRouterDOM } from "../deps.ts";
import GameRoute from "./routes/GameRoute.tsx";
import GuideRouteJson from "./routes/GuideRouteJson.tsx";
import GuideRouteMd from "./routes/GuideRouteMd.tsx";
import HomeRoute from "./routes/HomeRoute.tsx";
import NotFoundRoute from "./routes/NotFoundRoute.tsx";

const App = () => {
  return (
    <ReactRouterDOM.HashRouter>
      <div className="router">
        <ReactRouterDOM.Routes>
          <ReactRouterDOM.Route path="/games/:id" element={<GameRoute />} />
          <ReactRouterDOM.Route
            path="/guides/md/:id"
            element={<GuideRouteMd />}
          />
          <ReactRouterDOM.Route
            path="/guides/json/:id"
            element={<GuideRouteJson />}
          />
          <ReactRouterDOM.Route path="/" element={<HomeRoute />} />
          <ReactRouterDOM.Route path="*" element={<NotFoundRoute />} />
        </ReactRouterDOM.Routes>
      </div>
    </ReactRouterDOM.HashRouter>
  );
};

export default App;
