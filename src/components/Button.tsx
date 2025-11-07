import React, { useState } from "react";

interface ButtonProps {
  text: string; // 버튼 내부 텍스트
  size?: "sm" | "md" | "lg"; // 버튼 크기
  onClick?: () => void; // 외부 클릭 이벤트
  defaultSelected?: boolean; // 초기 선택 여부
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
}) => {
  const [selected, setSelected] = useState(defaultSelected);

  const handleClick = () => {
    setSelected(!selected);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        font-pretendard flex items-center justify-center rounded-lg font-medium transition-colors duration-200
        ${sizeClasses[size]}
        ${
          selected
            ? "bg-brand-primary text-brand-default" // 보라색 활성화
            : "bg-brand-default border-scale-100 hover:bg-scale-300"
        }
      `}
    >
      {/* 아이콘 예시 (TV나 필름 아이콘 대신 대체 가능) */}
      {selected ? (
        <span className="text-brand-default"></span>
      ) : (
        <span className="text-scale-500"></span>
      )}
      {text}
    </button>
  );
};
