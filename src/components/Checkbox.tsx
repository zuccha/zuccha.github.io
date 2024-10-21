import { React, FreeRegularSvgIcons, ReactFontAwesome } from "../../deps.ts";
import Text from "./Text.tsx";

interface CheckboxProps {
  isChecked: boolean;
  label: string;
  onToggleChecked: () => void;
}

const Checkbox = ({ isChecked, label, onToggleChecked }: CheckboxProps) => {
  return (
    <div className="checkbox" onClick={onToggleChecked}>
      <ReactFontAwesome.FontAwesomeIcon
        icon={
          isChecked
            ? FreeRegularSvgIcons.faCheckSquare
            : FreeRegularSvgIcons.faSquare
        }
        className="checkbox-icon"
      />
      <Text text={label} variant="t1" />
    </div>
  );
};

export default Checkbox;
