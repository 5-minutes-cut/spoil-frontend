import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { kakaoSignIn } from "../apis/api";

export default function Auth() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const code = useMemo(() => params.get("code"), [params]);

  useEffect(() => {
    (async () => {
      if (!code) {
        navigate("/", { replace: true });
        return;
      }
      const ok = await kakaoSignIn(code);
      navigate(ok ? "/search" : "/", { replace: true });
    })();
  }, [code, navigate]);

  return (
    <section className="w-full mx-auto">
      <div className="py-16 text-center text-gray-700">로그인 처리 중…</div>
    </section>
  );
}
