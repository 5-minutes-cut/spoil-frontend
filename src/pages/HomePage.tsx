import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">작품 검색</h2>
      <input
        className="w-full rounded-xl border px-4 py-3 mb-4"
        placeholder="작품 제목을 입력하세요"
      />
      <div className="space-y-2">
        <Link
          to="/detail/123"
          className="block rounded-lg border px-4 py-3 hover:bg-gray-50"
        >
          무스포 시즌1 (ID: 123)
        </Link>
        <Link
          to="/detail/456"
          className="block rounded-lg border px-4 py-3 hover:bg-gray-50"
        >
          무스포 시즌2 (ID: 456)
        </Link>
      </div>
    </section>
  );
}
