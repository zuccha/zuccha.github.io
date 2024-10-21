import {
  React,
  ReactMarkdown,
  ReactRouterDOM,
  RehypeRaw,
  RemarkGfm,
} from "../../deps.ts";
import Button from "../components/Button.tsx";
import CourtesyMessage from "../components/CourtesyMessage.tsx";
import Header from "../components/Header.tsx";
import NavigationBar from "../components/NavigationBar.tsx";
import Text from "../components/Text.tsx";
import useResource from "../hooks/useResource.ts";
import { parseGame } from "../models/Game.ts";

const components = {};
const RehypePlugins = [RehypeRaw];
const RemarkPlugins = [RemarkGfm];

const GameRoute = () => {
  document.title = "Game";

  const location = ReactRouterDOM.useLocation();
  const pathnames = location.pathname.split("/");
  const name = pathnames[pathnames.length - 1];

  const [game, status] = useResource(`/static/games/${name}.json`, parseGame);

  if (status === "initial" || status === "loading") {
    return null;
  }

  if (status === "failure") {
    return (
      <CourtesyMessage
        title="The game is not valid :("
        button={{ label: "HOME", href: "/" }}
      />
    );
  }

  document.title = game.title;

  return (
    <div className="game-route">
      <NavigationBar backUrl="/" />

      <div className="game-route-content">
        <div className="game-route-body">
          <Header title={game.title} />

          <img
            src={game.image.src}
            alt={game.image.alt}
            className="game-route-img"
          />

          <div className="game-route-downloads">
            <Text text="Downloads:" variant="h5" />
            <Button href={game.downloads.windows} label="Windows" isExternal />
            <Button href={game.downloads.macOS} label="macOS" isExternal />
          </div>

          <div className="game-route-description">
            {game.description.map((paragraph) => (
              <ReactMarkdown
                components={components}
                rehypePlugins={RehypePlugins}
                remarkPlugins={RemarkPlugins}
              >
                {paragraph}
              </ReactMarkdown>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRoute;
