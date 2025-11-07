import { useCallback, useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSeriesList, Series } from "../../apis/api";
import HomeCard from "./components/HomeCard";

type Work = {
  id: string;
  title: string;
  imageUrl: string;
};

type Watching = Work & {
  season: number;
  episode: number;
};

// 시청 작품 더미 데이터
const WATCHING: Watching[] = [
  {
    id: "k1",
    title: "더 글로리",
    imageUrl:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1200&auto=format&fit=crop",
    season: 1,
    episode: 5,
  },
  {
    id: "m2",
    title: "진격의 거인",
    imageUrl:
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=1200&auto=format&fit=crop",
    season: 4,
    episode: 12,
  },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [allWorks, setAllWorks] = useState<Series[]>([]);

  useEffect(() => {
    const fetchSeries = async () => {
      const seriesData = await getSeriesList();
      setAllWorks(seriesData);
    };
    fetchSeries();
  }, []);

  const byQuery = useCallback(
    (t: string) => {
      const q = query.trim().toLowerCase();
      return t.toLowerCase().includes(q);
    },
    [query],
  );

  const watchingFiltered = useMemo(() => {
    return WATCHING.filter((w) => byQuery(w.title));
  }, [byQuery]);

  const allFiltered = useMemo(() => {
    return allWorks.filter((w) => byQuery(w.title));
  }, [allWorks, byQuery]);

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
        전체 작품
      </h3>
      {allFiltered.length === 0 ? (
        <p className="mb-10 rounded-xl border border-brand-tertiary bg-bg-white px-4 py-6 text-sm text-gray-600">
          해당 작품이 아직 LOCKSPO에 없습니다.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-10">
          {allFiltered.map((w) => (
            <Link
              key={w.id}
              to={`/detail/${w.id}`}
              className="block w-full"
            >
              <HomeCard title={w.title} imageUrl={w.photo ?? undefined} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
