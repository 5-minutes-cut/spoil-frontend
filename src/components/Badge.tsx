import React from "react";

interface BadgeProps {
  label: string; // 표시할 텍스트
  bgPurple?: boolean; // 초기 선택 상태
}

export const Badge: React.FC<BadgeProps> = ({ label, bgPurple = false }) => {
  return (
    <button
      className={`
        px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
        ${
          bgPurple
            ? "bg-brand-secondary text-brand-primary"
            : "bg-brand-tertiary text-shadow-gray-700"
        }
      `}
    >
      {label}
    </button>
  );
};
