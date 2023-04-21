import React from "react";

type ComponentProps = {
  text: string;
};

export default function TargetedCardWindowHeader({ text }: ComponentProps) {
  const result = (
    <div className="flex items-center justify-center bg-neutral">
      <p className="font-bold text-lg text-neutral-content">{text}</p>
    </div>
  );

  return result;
}
