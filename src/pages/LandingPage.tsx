import { Link } from "react-router-dom";
import { WorkCard } from "../pages/ChatPage/components/WorkCard";

export default function LandingPage() {
  return (
    <section className="w-full py-10">
      <h1 className="text-3xl font-bold mb-3">스포일 방지 검색</h1>
      <p className="text-gray-600 mb-8">
        로그인 없이 라우팅만 구성한 상태입니다.
      </p>
      <Link
        to="/search"
        className="w-full inline-block text-center rounded-xl bg-gray-900 text-white px-4 py-3"
      >
        시작하기 → /search
      </Link>
      <WorkCard
        title="예시 작품"
        description="이것은 예시 작품의 설명입니다."
        imageUrl="/public/WorkCardImage.svg"
        badges={["추천", "신작"]}
        seasons={["1", "2", "3"]}
        episodes={["1", "2", "3", "4", "5"]}
        onSubmit={(season, episode) =>
          alert(`선택된 시즌: ${season}, 에피소드: ${episode}`)
        }
      />
    </section>
  );
}
