import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="w-full py-16 text-center">
      <h2 className="text-2xl font-bold mb-2">페이지를 찾을 수 없어요</h2>
      <p className="text-gray-600 mb-6">주소를 다시 확인해주세요.</p>
      <Link
        to="/"
        className="inline-block rounded-lg bg-gray-900 text-white px-4 py-2"
      >
        홈으로
      </Link>
    </section>
  );
}
