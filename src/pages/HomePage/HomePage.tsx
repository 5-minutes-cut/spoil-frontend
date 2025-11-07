import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import {
  LaptopBlack,
  LaptopWhite,
  SparkBlack,
  SparkWhite,
  TVBlack,
  TVWhite,
  VideoBlack,
  VideoWhite,
} from "../../assets/icons";
import HomeCard from "./components/HomeCard";

type Category = "hand" | "eng" | "mid" | "ani";

type Work = {
  id: string;
  title: string;
  imageUrl: string;
  category: Category;
};

type Watching = Work & {
  season: number;
  episode: number;
};

// 전체 작품 더미 데이터
const ALL_WORKS: Work[] = [
  {
    id: "g1",
    title: "원피스",
    imageUrl:
      "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?q=80&w=1200&auto=format&fit=crop",
    category: "ani",
  },
  {
    id: "k1",
    title: "더 글로리",
    imageUrl:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1200&auto=format&fit=crop",
    category: "hand",
  },
  {
    id: "m1",
    title: "Breaking Bad",
    imageUrl:
      "https://images.unsplash.com/photo-1459257831348-f0cdd359235f?q=80&w=1200&auto=format&fit=crop",
    category: "mid",
  },
  {
    id: "e2",
    title: "셜록",
    imageUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop",
    category: "eng",
  },
  {
    id: "m2",
    title: "진격의 거인",
    imageUrl:
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=1200&auto=format&fit=crop",
    category: "ani",
  },
];

// 시청 작품 더미 데이터
const WATCHING: Watching[] = [
  {
    id: "k1",
    title: "더 글로리",
    imageUrl:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1200&auto=format&fit=crop",
    category: "hand",
    season: 1,
    episode: 5,
  },
  {
    id: "m2",
    title: "진격의 거인",
    imageUrl:
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=1200&auto=format&fit=crop",
    category: "ani",
    season: 4,
    episode: 12,
  },
];

type Tab = "all" | "hand" | "engmid" | "ani";

const ICONS = {
  all: { on: SparkWhite, off: SparkBlack },
  hand: { on: TVWhite, off: TVBlack },
  engmid: { on: VideoWhite, off: VideoBlack },
  ani: { on: LaptopWhite, off: LaptopBlack },
} as const;

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("all");

  const categoryMatch = useCallback(
    (c: Category) => {
      return (
        tab === "all" ||
        (tab === "hand" && c === "hand") ||
        (tab === "ani" && c === "ani") ||
        (tab === "engmid" && (c === "eng" || c === "mid"))
      );
    },
    [tab],
  );

  const byQuery = useCallback(
    (t: string) => {
      const q = query.trim().toLowerCase();
      return t.toLowerCase().includes(q);
    },
    [query],
  );

  const watchingFiltered = useMemo(() => {
    return WATCHING.filter(
      (w) => categoryMatch(w.category) && byQuery(w.title),
    );
  }, [categoryMatch, byQuery]);

  const allFiltered = useMemo(() => {
    return ALL_WORKS.filter(
      (w) => categoryMatch(w.category) && byQuery(w.title),
    );
  }, [categoryMatch, byQuery]);

  return (
    <section className="w-full mx-auto">
      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 w-full rounded-xl border border-brand-tertiary bg-bg-white px-4 shadow-sm placeholder:text-gray-400"
          placeholder="작품을 검색하세요.."
        />
      </div>
      <div className="mb-8 flex flex-wrap gap-3">
        <Button
          text="전체"
          size="md"
          leftIconSrc={tab === "all" ? ICONS.all.on : ICONS.all.off}
          selected={tab === "all"}
          onClick={() => setTab("all")}
        />
        <Button
          text="한드"
          size="md"
          leftIconSrc={tab === "hand" ? ICONS.hand.on : ICONS.hand.off}
          selected={tab === "hand"}
          onClick={() => setTab("hand")}
        />
        <Button
          text="영드/미드"
          size="md"
          leftIconSrc={tab === "engmid" ? ICONS.engmid.on : ICONS.engmid.off}
          selected={tab === "engmid"}
          onClick={() => setTab("engmid")}
        />
        <Button
          text="애니"
          size="md"
          leftIconSrc={tab === "ani" ? ICONS.ani.on : ICONS.ani.off}
          selected={tab === "ani"}
          onClick={() => setTab("ani")}
        />
      </div>

      <h3 className="mb-3 text-lg font-bold text-gray-900 py-3">
        시청 중인 작품
      </h3>
      {watchingFiltered.length === 0 ? (
        <p className="mb-10 rounded-xl border border-brand-tertiary bg-bg-white px-4 py-6 text-sm text-gray-600">
          아직 시청 기록을 입력한 작품이 없습니다.
        </p>
      ) : (
        <div className="mb-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {watchingFiltered.map((w) => (
            <Link key={w.id} to={`/detail/${w.id}`} className="block w-full">
              <HomeCard
                title={w.title}
                seasonInfo={w.season}
                episodeInfo={w.episode}
                imageUrl={w.imageUrl}
              />
            </Link>
          ))}
        </div>
      )}
      <h3 className="mb-3 mt-6 text-lg font-bold text-gray-900 py-3">
        {tab === "all"
          ? "전체 작품"
          : tab === "hand"
          ? "한드 전체 작품"
          : tab === "ani"
          ? "애니 전체 작품"
          : "영드/미드 전체 작품"}
      </h3>
      {allFiltered.length === 0 ? (
        <p className="mb-10 rounded-xl border border-brand-tertiary bg-bg-white px-4 py-6 text-sm text-gray-600">
          해당 작품이 아직 LOCKSPO에 없습니다.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-10">
          {allFiltered.map((w) => (
            <Link key={w.id} to={`/detail/${w.id}`} className="block w-full">
              <HomeCard title={w.title} imageUrl={w.imageUrl} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
