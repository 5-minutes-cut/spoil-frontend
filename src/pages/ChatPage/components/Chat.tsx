import React, { useEffect, useState } from "react";
import {
  createConversation,
  createQAPair,
  getQAPairs,
  ID,
  QAPair,
} from "../../../apis/api";
import { ChatButton, WhiteLogo } from "../../../assets/icons";

interface ChatProps {
  workId?: string;
  conversationId?: ID;
  season: number;
  episode: number;
  title: string;
}

export const Chat: React.FC<ChatProps> = ({
  workId,
  conversationId,
  season,
  episode,
  title,
}) => {
  const [qaPairs, setQaPairs] = useState<QAPair[]>([]);
  const [input, setInput] = useState("");
  const [currentConversationId, setCurrentConversationId] = useState<
    ID | undefined
  >(conversationId);

  useEffect(() => {
    setCurrentConversationId(conversationId);
    if (conversationId) {
      const fetchQAPairs = async () => {
        const pairs = await getQAPairs(conversationId);
        setQaPairs(pairs);
      };
      fetchQAPairs();
    } else {
      setQaPairs([]);
    }
  }, [conversationId]);

  const handleSubmit = async () => {
    const questionText = input.trim();
    if (!questionText) return;

    setInput("");

    let convId = currentConversationId;
    if (!convId && workId) {
      const newConv = await createConversation({ series: Number(workId) });
      if (newConv) {
        convId = newConv.id;
        setCurrentConversationId(newConv.id);
      }
    }

    if (convId) {
      // Optimistic update
      const tempId = Date.now();
      setQaPairs((prev) => [
        ...prev,
        {
          id: tempId,
          conversation: convId,
          question_text: questionText,
          created_at: new Date().toISOString(),
        },
      ]);

      const newQAPair = await createQAPair(convId, { question: questionText });
      if (newQAPair) {
        setQaPairs((prev) =>
          prev.map((p) => (p.id === tempId ? newQAPair : p)),
        );
      }
    }
  };

  return (
    <div className="w-full  bg-white rounded-2xl shadow-md overflow-hidden">
      {/* 상단 헤더 */}
      <div className="bg-gradient-to-r from-gradient-start to-gradient-end text-bg-white p-4 rounded-t-2xl flex flex-col justify-center">
        <div className="flex">
          <img src={WhiteLogo} alt="Logo" className="w-4 h-4 mr-2" />
          <h2 className="text-sm font-semibold">스포일러 방지 검색</h2>
        </div>
        <p className="text-xs opacity-90 mt-1">
          {title} (시즌 {season}, {episode}화 까지의 내용만 답변합니다)
        </p>
      </div>

      {/* 본문 메시지 영역 */}
      <div className="p-4 h-[350px] overflow-y-auto flex flex-col gap-3 bg-gray-50 scrollbar-hidden">
        {qaPairs.map((qa) => (
          <React.Fragment key={qa.id}>
            <div className="bg-brand-primary border border-brand-primary text-white rounded-xl p-3 text-sm shadow-sm w-fit max-w-[30%] self-end">
              {qa.question_text}
            </div>
            {qa.answer_text && (
              <div className="bg-gray-200 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 w-fit max-w-[70%] shadow-sm self-start">
                {qa.answer_text}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 입력 영역 */}
      <div className="border-t border-gray-200 p-3 bg-gray-50 flex items-center gap-2">
        <input
          type="text"
          placeholder="궁금한 점을 물어보세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="flex-1 border border-gray-300 bg-bg-white rounded-xl px-4 py-4 text-sm focus:outline-none"
        />
        <img
          src={ChatButton}
          alt="Send"
          className="w-18 h-18 cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
