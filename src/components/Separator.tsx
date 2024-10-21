import { React } from "../../deps.ts";
import Text from "./Text.tsx";

interface SeparatorProps {
  title?: string;
}

const Separator = ({ title }: SeparatorProps) => {
  return (
    <div className="separator">
      <div className="separator-line" />
      {title && (
        <div className="separator-title">
          <Text text={title} variant="h5" />
        </div>
      )}
      <div className="separator-line" />
    </div>
  );
};

export default Separator;
