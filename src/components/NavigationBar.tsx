import { FreeRegularSvgIcons, React, ReactRouterDOM } from "../../deps.ts";
import ActionButton from "./ActionButton.tsx";
import Button from "./Button.tsx";
import IconButton from "./IconButton.tsx";

interface NavigationBarProps {
  actions?: {
    isActive?: boolean;
    label: string;
    onClick: () => void;
  }[];
  contentBelow?: React.ReactNode;
  backUrl?: string;
}

const NavigationBar = ({
  actions = [],
  contentBelow,
  backUrl,
}: NavigationBarProps) => {
  const navigate = ReactRouterDOM.useNavigate();
  const handleGoBack = React.useCallback(() => {
    if (backUrl) navigate(backUrl);
  }, []);

  return (
    <div className="navigation-bar">
      <div className="navigation-bar-header">
        {backUrl ? (
          <Button
            hideBorder
            href={backUrl}
            icon={FreeRegularSvgIcons.faArrowAltCircleLeft}
            label="Back"
          />
        ) : (
          <div />
        )}
        <div>
          {actions.map((action) => (
            <ActionButton
              onClick={action.onClick}
              label={action.label}
              hideBorder
              isActive={action.isActive}
            />
          ))}
        </div>
      </div>
      {contentBelow}
    </div>
  );
};

export default NavigationBar;
