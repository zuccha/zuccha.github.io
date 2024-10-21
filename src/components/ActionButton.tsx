import { FontAwesomeSvgCore, React, ReactFontAwesome } from "../../deps.ts";
import Text from "./Text.tsx";

interface ActionButtonProps {
  full?: boolean;
  hideBorder?: boolean;
  icon?: FontAwesomeSvgCore.IconDefinition;
  isActive?: boolean;
  label: string;
  onClick: () => void;
}

const ActionButton = ({
  full,
  hideBorder,
  icon,
  isActive,
  label,
  onClick,
}: ActionButtonProps) => {
  const className = React.useMemo(() => {
    const classNames = ["button"];
    if (full) classNames.push("button-full");
    if (hideBorder) classNames.push("button-no-border");
    if (isActive) classNames.push("button-active");
    return classNames.join(" ");
  }, [hideBorder, icon, isActive]);

  return (
    <div className={className} onClick={onClick}>
      {icon && (
        <ReactFontAwesome.FontAwesomeIcon icon={icon} className="button-icon" />
      )}
      <Text text={label} variant="t1" />
    </div>
  );
};

export default ActionButton;
