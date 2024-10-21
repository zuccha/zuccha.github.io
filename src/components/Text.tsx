import { React } from "../../deps.ts";

interface TextProps {
  text: string;
  align?: "left" | "center" | "right";
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "t1";
}

const Text = ({ text, align = "left", variant }: TextProps) => {
  return <div className={`text text-${align} text-${variant}`}>{text}</div>;
};

export default Text;
