import React, { useState } from "react";
import { ChatButton, Unseen, Seen, WhiteLogo } from "../../../assets/icons";

interface ChatProps {
  season?: number;
  episode?: number;
  title?: string;
}

export const Chat: React.FC<ChatProps> = ({
  season = 1,
  episode = 5,
  title = "더 글로리",
}) => {
  const [messages, setMessages] = useState<
    { sender: "bot" | "user"; text: string; LOCKSPOer?: boolean }[]
  >([
    {
      sender: "bot",
      text: `안녕하세요! ${title}에 대해 궁금한 점을 물어보세요. 현재 시청 기록(시즌 ${season}, ${episode}화)을 기준으로 스포일러 없는 답변을 드리겠습니다.`,
    },
  ]);

  // season, episode, title이 바뀔 때 첫 메시지 업데이트
  React.useEffect(() => {
    setMessages((prev) => {
      const updated = [...prev];
      updated[0] = {
        sender: "bot",
        text: `안녕하세요! ${title}에 대해 궁금한 점을 물어보세요. 현재 시청 기록(시즌 ${season}, ${episode}화)을 기준으로 스포일러 없는 답변을 드리겠습니다.`,
      };
      return updated;
    });
  }, [season, episode, title]);

  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState<{ [key: number]: boolean }>({});

  const handleSubmit = () => {
    const selector = 'input[placeholder="궁금한 점을 물어보세요..."]';
    const inp = document.querySelector(selector) as HTMLInputElement | null;
    const value = (inp?.value ?? input).trim();
    if (!value) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: value },
      {
        sender: "bot",
        text: "주인공 문동은은 학창 시절 심각한 학교 폭력의 피해자였습니다. 시즌 1, 3화에서 그녀가 겪었던 폭력의 상처가 자세히 드러나며, 이것이 그녀의 복수 계획의 동기가 됩니다.",
        LOCKSPOer: true,
      },
    ]);
    setInput("");
    if (inp) inp.value = "";
  };

  React.useEffect(() => {
    const selector = 'input[placeholder="궁금한 점을 물어보세요..."]';
    const inp = document.querySelector(selector) as HTMLInputElement | null;
    const img = document.querySelector(
      'img[alt="Send"]',
    ) as HTMLImageElement | null;
    if (!inp && !img) return;

    const onInput = (e: Event) =>
      setInput((e.target as HTMLInputElement).value);
    const submitFromDom = () => {
      const val = inp?.value.trim();
      if (!val) return;
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: val },
        {
          sender: "bot",
          text: "주인공 문동은은 학창 시절 심각한 학교 폭력의 피해자였습니다. 시즌 1, 3화에서 그녀가 겪었던 폭력의 상처가 자세히 드러나며, 이것이 그녀의 복수 계획의 동기가 됩니다.",
          LOCKSPOer: true,
        },
      ]);
      setInput("");
      if (inp) inp.value = "";
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitFromDom();
      }
    };

    if (inp) {
      inp.addEventListener("input", onInput);
      inp.addEventListener("keydown", onKeyDown);
    }
    if (img) img.addEventListener("click", submitFromDom);

    return () => {
      if (inp) {
        inp.removeEventListener("input", onInput);
        inp.removeEventListener("keydown", onKeyDown);
      }
      if (img) img.removeEventListener("click", submitFromDom);
    };
  }, []);

  return (
    <div className="w-full  bg-white rounded-2xl shadow-md overflow-hidden">
      {/* 상단 헤더 */}
      <div className="bg-gradient-to-r from-gradient-start to-gradient-end text-bg-white p-4 rounded-t-2xl flex flex-col justify-center">
        <div className="flex">
          <img src={WhiteLogo} alt="Logo" className="w-4 h-4 mr-2" />
          <h2 className="text-sm font-semibold">스포일러 방지 검색</h2>
        </div>
        <p className="text-xs opacity-90 mt-1">
          시즌 {season}, {episode}화 까지의 내용만 답변합니다
        </p>
      </div>

      {/* 본문 메시지 영역 */}
      <div className="p-4 h-[350px] overflow-y-auto flex flex-col gap-3 bg-gray-50 scrollbar-hidden">
        {messages.map((msg, idx) => {
          // 스포일러 메시지인 경우
          if (msg.sender === "bot" && msg.LOCKSPOer) {
            const isRevealed = revealed[idx];
            return (
              <div
                key={idx}
                className="bg-gray-200 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 w-fit max-w-[70%] shadow-sm self-start"
              >
                <p className="text-gray-700 mb-3">{msg.text}</p>
                <div
                  className={`rounded-xl transition-colors ${
                    isRevealed
                      ? "bg-LOCKSPOer-bg border border-LOCKSPOer-border p-3"
                      : "bg-gray-100 text-gray-400 p-3"
                  }`}
                >
                  {isRevealed ? (
                    <>
                      <p className="text-gray-700 text-sm">
                        이후 시즌 1, 8화에서 그녀는 가해자들을 하나씩 찾아가며
                        복수를 시작합니다. 특히 대면 장면이 인상적입니다.
                      </p>
                    </>
                  ) : (
                    <p className="italic text-gray-400 text-sm">
                      스포일러를 포함한 내용이 숨겨져 있습니다...
                    </p>
                  )}
                </div>
                <button
                  onClick={() =>
                    setRevealed((prev) => ({ ...prev, [idx]: !prev[idx] }))
                  }
                  className="mt-3 text-brand-primary text-sm font-medium flex items-center gap-1"
                >
                  <img
                    src={isRevealed ? Unseen : Seen}
                    alt="Reveal"
                    className="w-4 h-4"
                  />
                  {isRevealed ? "스포일러 숨기기" : "스포일러 확인하기"}
                </button>
              </div>
            );
          }

          // 일반 bot/user 메시지
          return (
            <div
              key={idx}
              className={
                msg.sender === "bot"
                  ? "bg-gray-200 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 w-fit max-w-[70%] shadow-sm self-start"
                  : "bg-brand-primary border border-brand-primary text-white rounded-xl p-3 text-sm shadow-sm w-fit max-w-[30%] self-end"
              }
            >
              {msg.text}
            </div>
          );
        })}
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
