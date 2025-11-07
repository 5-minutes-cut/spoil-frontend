import React from "react";
import { Dropdown } from "../../../../src/components/Dropdown"; // 앞서 만든 드롭다운 재사용
import { Badge } from "../../../../src/components/Badge"; // 앞서 만든 배지 재사용

interface WorkCardProps {
  title: string;
  description: string;
  imageUrl: string;
  badges?: string[];
  seasons: string[];
  episodes: string[];
  onSubmit?: (season: string, episode: string) => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  title,
  description,
  imageUrl,
  badges = [],
  seasons,
  episodes,
  onSubmit,
}) => {
  const [selectedSeason, setSelectedSeason] = React.useState(seasons[0]);
  const [selectedEpisode, setSelectedEpisode] = React.useState(episodes[0]);

  const handleSubmit = () => {
    if (onSubmit) onSubmit(selectedSeason, selectedEpisode);
  };

  return (
    <div className="flex w-full bg-brand-default rounded-2xl shadow-sm  h-60 items-stretch">
      {/* 왼쪽 이미지 */}
      <div className="w-1/3">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 오른쪽 콘텐츠 */}
      <div className="w-2/3 p-6 flex flex-col justify-between">
        {/* 제목 및 배지 */}
        <div>
          <div className="flex items-center mb-2">
            <h2 className="text-xl font-semibold pr-5">{title}</h2>
            <div className="flex items-center gap-2">
              {badges.map((b) => (
                <Badge key={b} label={b} />
              ))}
            </div>
          </div>
          <p className="text-gray-600 py-3 text-sm leading-snug">
            {description}
          </p>
        </div>

        {/* 시청 기록 영역 */}
        <div className="mt-1 bg-gray-50 rounded-xl p-4 ">
          <div className="flex items-start gap-10">
            <div className="flex flex-col shrink-0">
              <p className="text-xs text-gray-500 mb-2">시즌</p>
              <Dropdown
                options={seasons}
                defaultOption={selectedSeason}
                onChange={(v) => setSelectedSeason(v)}
              />
            </div>

            <div className="flex flex-col shrink-0">
              <p className="text-xs text-gray-500 mb-2">시청 기록</p>
              <Dropdown
                options={episodes}
                defaultOption={selectedEpisode}
                onChange={(v) => setSelectedEpisode(v)}
              />
            </div>
            <div className="shrink-0 mt-6">
              <button
                onClick={handleSubmit}
                className="bg-brand-primary text-brand-default px-10 py-2 rounded-md text-sm font-medium hover:bg-brand-hover transition-colors"
              >
                수정
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
