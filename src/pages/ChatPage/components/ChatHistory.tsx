import React, { useEffect, useState } from "react";
import { getConversations, Conversation } from "../../../apis/api";

interface ChatHistoryProps {
  onSelect: (conversation: Conversation) => void;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ onSelect }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const data = await getConversations();
      setConversations(data);
    };
    fetchConversations();
  }, []);

  return (
    <div className="w-full h-130 bg-bg-white rounded-2xl shadow-md p-4 flex flex-col">
      <h2 className="text-base font-semibold mb-4">채팅 기록</h2>
      <div className="flex flex-col gap-3 overflow-y-auto">
        {conversations.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <p className="text-xs text-gray-500 mb-1">
              {new Date(item.created_at).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-800">{item.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
