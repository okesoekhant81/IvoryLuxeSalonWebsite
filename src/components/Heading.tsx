import type { ReactNode } from "react";

type Props = {
  as?: "h1" | "h2";
  eyebrow: ReactNode;
  emphasis: ReactNode;
  size?: "hero" | "default";
  className?: string;
};

export default function Heading({ as: Tag = "h2", eyebrow, emphasis, size = "default", className = "" }: Props) {
  const emphasisSize = size === "hero" ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl";
  return (
    <Tag className={`leading-tight text-black ${className}`}>
      <span className="block font-sans text-xl font-normal not-italic md:text-2xl">{eyebrow}</span>
      <span className={`font-serif-italic block ${emphasisSize}`}>{emphasis}</span>
    </Tag>
  );
}
