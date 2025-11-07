import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Conversation,
  Episode,
  getEpisodes,
  getSeasons,
  getSeriesDetail,
  Season,
  Series,
} from "../../apis/api";
import { WorkCard } from "./components/WorkCard";
import { Chat } from "./components/Chat";
import { ChatHistoryButton } from "./components/ChatHistoryButton";
import { ChatHistory } from "./components/ChatHistory";

export default function ChatPage() {
  const { workId } = useParams<{ workId: string }>();

  const [seriesDetail, setSeriesDetail] = useState<Series | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const [showHistory, setShowHistory] = React.useState(false);
  const [chatTitle, setChatTitle] = React.useState(
    "현재 시청 기록을 기준으로 대화 중입니다.",
  );

  useEffect(() => {
    if (!workId) return;
    const fetchSeries = async () => {
      const detail = await getSeriesDetail(workId);
      setSeriesDetail(detail);
    };
    fetchSeries();
  }, [workId]);

  useEffect(() => {
    if (!seriesDetail) return;
    const fetchSeasons = async () => {
      const seasonData = await getSeasons({ series: seriesDetail.id });
      setSeasons(seasonData);
      if (seasonData.length > 0) {
        setSelectedSeason(seasonData[0]);
      }
    };
    fetchSeasons();
  }, [seriesDetail]);

  useEffect(() => {
    if (!selectedSeason) return;
    const fetchEpisodes = async () => {
      const episodeData = await getEpisodes({ season: selectedSeason.id });
      setEpisodes(episodeData);
      if (episodeData.length > 0) {
        setSelectedEpisode(episodeData[0]);
      }
    };
    fetchEpisodes();
  }, [selectedSeason]);

  //  히스토리 클릭 시 실행
  const handleSelectHistory = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setChatTitle(conversation.summary ?? "이전 대화");
    setShowHistory(false); // 히스토리 닫기
  };

  if (!seriesDetail || !selectedSeason || !selectedEpisode) {
    return <div>로딩 중...</div>;
  }

  return (
    <section className="flex flex-col items-center w-full min-h-screen bg-bg-light">
      <WorkCard
        season={String(selectedSeason.season_number)}
        episode={String(selectedEpisode.episode_number)}
        title={seriesDetail.title}
        description={seriesDetail.description ?? ""}
        imageUrl={seriesDetail.photo ?? "../../../public/Image.svg"}
        badges={[]} // TODO: 장르 정보
        seasons={seasons.map((s) => String(s.season_number))}
        episodes={episodes.map((e) => String(e.episode_number))}
        onSubmit={(season, episode) => {
          const newSeason = seasons.find(
            (s) => String(s.season_number) === season,
          );
          const newEpisode = episodes.find(
            (e) => String(e.episode_number) === episode,
          );
          if (newSeason) setSelectedSeason(newSeason);
          if (newEpisode) setSelectedEpisode(newEpisode);
        }}
      />

      <div className="w-full flex justify-between items-center">
        <p className="text-xl font-bold py-5">스포일러 방지 검색</p>
        <ChatHistoryButton onClick={() => setShowHistory(true)} />
      </div>

      {/* ChatHistory 왼쪽, Chat 오른쪽 */}
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
            workId={workId}
            conversationId={selectedConversation?.id}
            season={selectedSeason.season_number}
            episode={selectedEpisode.episode_number}
            title={chatTitle}
          />
        </div>
      </div>
    </section>
  );
}
