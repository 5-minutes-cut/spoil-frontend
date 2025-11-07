import React, { useState } from "react";

interface DropdownProps {
  options: string[]; // 선택지 목록
  defaultOption?: string; // 기본 선택값
  onChange?: (value: string) => void; // 선택 시 실행할 콜백
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultOption,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultOption || options[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div className="relative inline-block text-left">
      {/* 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between w-20 rounded-md border border-gray-300 bg-bg-white px-3 py-2.5 text-sm text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        {selected}
        <svg
          className={`h-4 w-4 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <ul className="absolute left-0 mt-1 w-20 rounded-md border border-gray-200 bg-bg-white shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer px-3 py-1.5 text-sm hover:bg-gray-100 ${
                selected === option
                  ? "text-brand-primary font-medium"
                  : "text-gray-700"
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
