import React from "react";
import { useParams } from "react-router-dom";
import { WorkCard } from "./components/WorkCard";
import { Chat } from "./components/Chat";

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
        imageUrl="https://example.com/the-glory.jpg"
        badges={["드라마", "스릴러"]}
        seasons={["1", "2"]}
        episodes={["1", "2", "3", "4", "5", "6", "7", "8"]}
        onSubmit={(season, episode) => {
          setSelectedSeason(season);
          setSelectedEpisode(episode);
        }}
      />

      {/* ✅ state 전달 */}
      <Chat season={Number(season)} episode={Number(episode)} title={title} />
    </section>
  );
}
