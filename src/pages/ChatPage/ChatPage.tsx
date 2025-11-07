import React from "react";
import { useParams } from "react-router-dom";
import { WorkCard } from "./components/WorkCard";
import { Chat } from "./components/Chat";
import { ChatHistoryButton } from "./components/ChatHistoryButton";
import { ChatHistory } from "./components/ChatHistory";

export default function ChatPage() {
  const { workId } = useParams<{ workId: string }>();
  const [season, setSelectedSeason] = React.useState("1");
  const [episode, setSelectedEpisode] = React.useState("1");
  const [title, setTitle] = React.useState("더 글로리");
  const [showHistory, setShowHistory] = React.useState(false);
  const [chatTitle, setChatTitle] = React.useState(
    "현재 시청 기록을 기준으로 대화 중입니다.",
  );

  // ✅ 히스토리 클릭 시 실행
  const handleSelectHistory = (itemTitle: string) => {
    setChatTitle(itemTitle);
    setShowHistory(false); // 히스토리 닫기
  };

  return (
    <section className="flex flex-col items-center w-full min-h-screen bg-bg-light">
      <WorkCard
        season={season}
        episode={episode}
        title={title}
        description="학교 폭력의 피해자가 복수를 계획하는 이야기"
        imageUrl="..\..\public\Image.svg"
        badges={["드라마", "스릴러"]}
        seasons={["1", "2"]}
        episodes={["1", "2", "3", "4", "5", "6", "7", "8"]}
        onSubmit={(season, episode) => {
          setSelectedSeason(season);
          setSelectedEpisode(episode);
        }}
      />

      <div className="w-full flex justify-between items-center">
        <p className="text-xl font-bold py-5">스포일러 방지 검색</p>
        <ChatHistoryButton onClick={() => setShowHistory(true)} />
      </div>

      {/* ✅ ChatHistory 왼쪽, Chat 오른쪽 */}
      <div className="flex w-full gap-6">
        {showHistory && (
          <div className="w-2/5 transition-all duration-300">
            <ChatHistory onSelect={handleSelectHistory} />
          </div>
        )}

        <div
          className={`transition-all duration-300 ease-in-out transform-gpu overflow-hidden ${
            showHistory
              ? "origin-right w-3/5 ml-0"
              : "origin-right w-full ml-auto"
          }`}
        >
          <Chat
            season={Number(season)}
            episode={Number(episode)}
            title={chatTitle}
          />
        </div>
      </div>
    </section>
  );
}
