import { FontAwesomeSvgCore, React, ReactFontAwesome } from "../../deps.ts";

interface IconButtonProps {
  hideBorder?: boolean;
  href: string;
  icon: FontAwesomeSvgCore.IconDefinition;
  isActive?: boolean;
  isExternal?: boolean;
}

const IconButton = ({
  hideBorder,
  href,
  icon,
  isActive,
  isExternal,
}: IconButtonProps) => {
  const className = React.useMemo(() => {
    const classNames = ["button icon-button"];
    if (hideBorder) classNames.push("button-no-border");
    if (isActive) classNames.push("button-active");
    return classNames.join(" ");
  }, [hideBorder, icon, isActive]);

  const target = isExternal ? "_blank" : undefined;

  return (
    <a className={className} href={href} target={target}>
      <ReactFontAwesome.FontAwesomeIcon icon={icon} className="button-icon" />
    </a>
  );
};

export default IconButton;
