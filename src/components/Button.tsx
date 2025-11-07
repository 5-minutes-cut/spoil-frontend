import React, { useState } from "react";

interface ButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  toggle?: boolean;
  selected?: boolean;
  leftIconSrc?: string;
}

const sizeClasses = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};

export const Button: React.FC<ButtonProps> = ({
  text,
  size = "md",
  onClick,
  toggle = false,
  selected,
  leftIconSrc,
}) => {
  const [innerSelected, setInnerSelected] = useState(false);
  const isControlled = selected !== undefined;
  const isSelected = isControlled ? selected! : innerSelected;

  const handleClick = () => {
    if (!isControlled && toggle) setInnerSelected((s) => !s);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={[
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 cursor-pointer",
        sizeClasses[size],
        isSelected
          ? "bg-brand-primary text-bg-white border-brand-primary hover:bg-brand-hover"
          : "bg-bg-white text-gray-700 border border-brand-tertiary hover:bg-brand-tertiary",
      ].join(" ")}
    >
      {leftIconSrc && (
        <img src={leftIconSrc} alt="아이콘" className="h-4 w-4 mr-2" />
      )}
      {text}
    </button>
  );
};

export default Button;
