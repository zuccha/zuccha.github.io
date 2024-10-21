import { React, FreeRegularSvgIcons } from "../../deps.ts";
import Button from "./Button.tsx";
import Text from "./Text.tsx";

interface CourtesyMessageProps {
  button?: {
    href: string;
    label: string;
  };
  title: string;
}

const CourtesyMessage = ({ button, title }: CourtesyMessageProps) => {
  return (
    <div className="courtesy-message">
      <Text text={title} variant="h3" />
      {button && (
        <div className="courtesy-message-action">
          <Button
            hideBorder
            href={button.href}
            icon={FreeRegularSvgIcons.faArrowAltCircleLeft}
            label={button.label}
          />
        </div>
      )}
    </div>
  );
};

export default CourtesyMessage;
