import React, { useState } from "react";

interface BadgeProps {
  label: string; // 표시할 텍스트
  defaultSelected?: boolean; // 초기 선택 상태
  onClick?: (selected: boolean) => void; // 선택 상태 변경 시 콜백
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  defaultSelected = false,
  onClick,
}) => {
  const [selected, setSelected] = useState(defaultSelected);

  const handleClick = () => {
    const newState = !selected;
    setSelected(newState);
    if (onClick) onClick(newState);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
        ${
          selected
            ? "bg-brand-secondary text-brand-primary" // 선택됨 (연보라 배경 + 진한 보라 텍스트)
            : "bg-brand-tertiary text-shadow-scale-700" // 비활성 (회색 배경 + 어두운 텍스트)
        }
      `}
    >
      {label}
    </button>
  );
};
