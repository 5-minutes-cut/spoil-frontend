import React from "react";
import { Dropdown } from "../../../../src/components/Dropdown";
import { Badge } from "../../../../src/components/Badge";

interface WorkCardProps {
  season: string; // ✅ 추가
  episode: string; // ✅ 추가
  title: string;
  description: string;
  imageUrl: string;
  badges?: string[];
  seasons: string[];
  episodes: string[];
  onSubmit?: (season: string, episode: string) => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  season,
  episode,
  title,
  description,
  imageUrl,
  badges = [],
  seasons,
  episodes,
  onSubmit,
}) => {
  const [selectedSeason, setSelectedSeason] = React.useState(season);
  const [selectedEpisode, setSelectedEpisode] = React.useState(episode);

  const handleSubmit = () => {
    if (onSubmit) onSubmit(selectedSeason, selectedEpisode);
  };

  return (
    <div className="flex w-full bg-bg-white rounded-2xl shadow-sm h-70 m-7 items-stretch">
      {/* 왼쪽 이미지 */}
      <div className="w-1/3 overflow-hidden rounded-l-2xl">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 오른쪽 콘텐츠 */}
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-2">
            <h2 className="text-xl font-semibold pr-5">{title}</h2>
            <div className="flex items-center gap-2">
              {badges.map((b, i) => (
                <Badge
                  key={`${b}-${i}`}
                  label={b}
                  bgPurple={i % 2 === 0 ? false : true}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 py-3 text-sm leading-snug">
            {description}
          </p>
        </div>

        {/* 시청 기록 영역 */}
        <div className="h-40 mt-3 bg-gray-50 rounded-xl p-4">
          <div className="text-l text-gray-700 font-extrabold">시청 기록</div>
          <div className="flex  items-start gap-5 ">
            <div className="flex flex-col flex-shrink ">
              <p className="text-xs text-gray-500 mb-2">시즌</p>
              <Dropdown
                options={seasons}
                defaultOption={selectedSeason}
                onChange={(v) => setSelectedSeason(v)}
              />
            </div>

            <div className="flex flex-col  flex-shrink">
              <p className="text-xs text-gray-500 mb-2">에피소드</p>
              <Dropdown
                options={episodes}
                defaultOption={selectedEpisode}
                onChange={(v) => setSelectedEpisode(v)}
              />
            </div>

            <div className="mt-6 flex-shrink">
              <button
                onClick={handleSubmit}
                className="bg-brand-primary text-bg-white px-8 py-2 rounded-md text-sm font-medium hover:bg-brand-hover transition-all duration-200"
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
