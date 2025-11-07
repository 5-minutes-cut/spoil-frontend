import type { FeatureCardProps } from "./components/FeatureCard";
import { Kakao, Logo, Search, Spark, Unseen } from "../../assets/icons";
import FeatureCard from "./components/FeatureCard";
import { kakaoSignIn } from "../../apis/api";

const FEATURES: FeatureCardProps[] = [
  {
    icon: Unseen,
    title: "능동적 스포일러 방지",
    desc: "시청 기록을 기반으로 정확하게 스포일러를 필터링합니다.",
    badgeBg: "bg-point-purple",
  },
  {
    icon: Search,
    title: "대화형 검색",
    desc: "자연어로 질문하면 AI가 명확한 답변을 제공합니다.",
    badgeBg: "bg-point-lilac",
  },
  {
    icon: Spark,
    title: "선택적 확인",
    desc: "스포일러가 포함된 내용은 원할 때만 확인할 수 있습니다.",
    badgeBg: "bg-point-pink",
  },
];

export default function LandingPage() {
  return (
    <section className="bg-landing w-full min-h-screen">
      <div className="w-full max-w-4xl mx-auto px-12 py-16">
        <div className="w-full mx-auto mb-6 flex h-12 items-center justify-center">
          <img src={Logo} className="w-16 h-16" />
          <span className="sr-only">스포일가드</span>
        </div>

        <h1 className="mx-auto mb-3 text-center text-4xl font-extrabold tracking-tight text-gray-800">
          스포일가드
        </h1>
        <p className="mx-auto mb-4 max-w-136 text-center text-base text-gray-600">
          스포일러 걱정 없이, 궁금한 건 언제든지
        </p>
        <p className="mx-auto mb-10 max-w-136 text-center text-sm leading-6 text-gray-500">
          드라마와 애니메이션을 보다가 궁금한 점이 생겼나요? 시청 기록을
          기반으로 스포일러를 완벽히 차단한 검색 결과를 제공합니다.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-10">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => kakaoSignIn}
            className="inline-flex w-full max-w-90 items-center justify-center gap-2 rounded-xl bg-point-kakao px-5 py-3 text-sm font-semibold text-black shadow-card transition hover:brightness-[0.97] active:brightness-[0.94]"
          >
            <img src={Kakao} className="h-6 w-6" />
            카카오로 시작하기
          </button>
        </div>
      </div>
    </section>
  );
}
