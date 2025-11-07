import React from "react";
import { useParams } from "react-router-dom";
import { WorkCard } from "./components/WorkCard";
import { Chat } from "./components/Chat";
import { ChatHistoryButton } from "./components/ChatHistoryButton";

export default function ChatPage() {
  const { workId } = useParams<{ workId: string }>();
  const [season, setSelectedSeason] = React.useState("1");
  const [episode, setSelectedEpisode] = React.useState("1");
  const [title, setTitle] = React.useState("더 글로리");

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
      <div className="w-full flex justify-between">
        <p className="text-xl font-bold pt-3">스포일러 방지 검색</p>
        <ChatHistoryButton onClick={() => alert("이전 채팅 기록 클릭됨")} />
      </div>
      {/* state 전달 */}
      <Chat season={Number(season)} episode={Number(episode)} title={title} />
    </section>
  );
}
