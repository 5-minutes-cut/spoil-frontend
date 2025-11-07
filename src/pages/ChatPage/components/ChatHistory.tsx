import React from "react";

interface ChatHistoryProps {
  onSelect: (title: string) => void;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ onSelect }) => {
  const history = [
    { date: "2024-01-15", title: "주인공의 복수 동기에 대한 질문" },
    { date: "2024-01-14", title: "등장인물 관계도 문의" },
    { date: "2024-01-13", title: "시즌 1 결말 관련 질문" },
  ];

  return (
    <div className="w-full h-130 bg-bg-white rounded-2xl shadow-md p-4 flex flex-col">
      <h2 className="text-base font-semibold mb-4">채팅 기록</h2>
      <div className="flex flex-col gap-3 overflow-y-auto">
        {history.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(item.title)}
            className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <p className="text-xs text-gray-500 mb-1">{item.date}</p>
            <p className="text-sm text-gray-800">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
