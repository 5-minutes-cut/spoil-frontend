import React from "react";
import { StreamingIcon } from "../../../assets/icons";

interface HomeCardProps {
  title: string;
  seasonInfo?: number;
  episodeInfo?: number;
  imageUrl: string;
}

export const HomeCard: React.FC<HomeCardProps> = ({
  title,
  seasonInfo,
  episodeInfo,
  imageUrl,
}) => {
  return seasonInfo != null && episodeInfo != null ? (
    <Seen
      title={title}
      seasonInfo={seasonInfo}
      episodeInfo={episodeInfo}
      imageUrl={imageUrl}
    />
  ) : (
    <Unseen title={title} imageUrl={imageUrl} />
  );
};

const Seen: React.FC<HomeCardProps> = ({
  title,
  seasonInfo,
  episodeInfo,
  imageUrl,
}) => {
  return (
    <div className="w-[220px] bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="relative w-full h-60">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-2 right-2 bg-[#5A42F3] hover:bg-[#4a36d1] text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-colors">
          <img src={StreamingIcon} alt="Streaming Icon" className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 py-5">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">
          시즌 {seasonInfo}, {episodeInfo}화
        </p>
      </div>
    </div>
  );
};

const Unseen: React.FC<HomeCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="w-[220px] bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="relative w-full h-60">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-4 py-5">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      </div>
    </div>
  );
};
