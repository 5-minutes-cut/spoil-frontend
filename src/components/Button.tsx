import React, { useEffect, useState } from "react";

interface ButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  defaultSelected?: boolean;
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
  defaultSelected = false,
  selected,
  leftIconSrc,
}) => {
  const [internal, setInternal] = useState(defaultSelected);

  useEffect(() => {
    setInternal(defaultSelected);
  }, [defaultSelected]);

  const isSelected = selected ?? internal;

  const handleClick = () => {
    if (selected === undefined) setInternal(!internal);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={[
        "font-pretendard flex items-center justify-center rounded-lg font-medium transition-colors duration-200 cursor-pointer",
        sizeClasses[size],

        isSelected
          ? "bg-brand-primary text-bg-white border-brand-primary hover:bg-brand-hover"
          : "bg-bg-white text-gray-700 border-brand-tertiary hover:bg-brand-tertiary",
      ].join(" ")}
    >
      {leftIconSrc && (
        <img src={leftIconSrc} alt="아이콘" className="h-4 w-4 mr-2" />
      )}
      {text}
    </button>
  );
};
