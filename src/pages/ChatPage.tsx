import { useParams } from "react-router-dom";

export default function ChatPage() {
  const { workId } = useParams<{ workId: string }>();

  return (
    <section className="w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chat - 작품 {workId}</h2>
      <div className="rounded-xl border p-4 min-h-[40dvh]">
        <p className="text-gray-500">작품별 대화/검색 UI가 들어갈 영역</p>
      </div>
    </section>
  );
}
