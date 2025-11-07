import React from "react";
import { ClockIcon } from "../../../assets/icons";

interface ChatHistoryButtonProps {
  onClick?: () => void;
}

export const ChatHistoryButton: React.FC<ChatHistoryButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
    >
      <img src={ClockIcon} alt="History Icon" className="w-4 h-4" />
      이전 채팅 기록
    </button>
  );
};
