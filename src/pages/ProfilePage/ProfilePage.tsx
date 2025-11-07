import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import {
  Bug,
  BugGreen,
  BugWhite,
  Edit,
  Logout,
  Profile,
  ProfileWhite,
  Save,
  Trash,
  TVBlack,
  TVWhite,
} from "../../assets/icons";
import ConfirmModal from "./components/ConfirmModal";

type Tab = "profile" | "records" | "bugs";

type User = {
  name: string;
  email: string;
  photoUrl: string;
  points: number;
};

type RecordItem = {
  id: string;
  title: string;
  imageUrl: string;
  season: number;
  episode: number;
  date: string;
};

type BugStatus = "approved" | "pending" | "rejected";
type BugItem = {
  id: string;
  date: string;
  content: string;
  status: BugStatus;
};

const INITIAL_USER: User = {
  name: "사용자님",
  email: "user@example.com",
  photoUrl:
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop",
  points: 5,
};

const INITIAL_RECORDS: RecordItem[] = [
  {
    id: "r1",
    title: "더 글로리",
    imageUrl:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=600&auto=format&fit=crop",
    season: 1,
    episode: 5,
    date: "2024-01-15",
  },
  {
    id: "r2",
    title: "진격의 거인",
    imageUrl:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=600&auto=format&fit=crop",
    season: 4,
    episode: 12,
    date: "2024-01-14",
  },
  {
    id: "r3",
    title: "Breaking Bad",
    imageUrl:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=600&auto=format&fit=crop",
    season: 5,
    episode: 16,
    date: "2024-01-10",
  },
];

const INITIAL_BUGS: BugItem[] = [
  {
    id: "b1",
    date: "2024-01-15",
    content: "시즌 1, 5화까지만 봤는데 8화 내용이 나왔습니다",
    status: "approved",
  },
  {
    id: "b2",
    date: "2024-01-13",
    content: "등장인물 이름 잘못 표기됨",
    status: "pending",
  },
  {
    id: "b3",
    date: "2024-01-03",
    content: "스포일러 필터 제대로 작동 안함",
    status: "rejected",
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("profile");
  const [user, setUser] = useState<User>(INITIAL_USER);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const fileRef = useRef<HTMLInputElement>(null);

  const [records, setRecords] = useState<RecordItem[]>(INITIAL_RECORDS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [seasonDraft, setSeasonDraft] = useState<number>(1);
  const [episodeDraft, setEpisodeDraft] = useState<number>(1);

  const [bugs] = useState<BugItem[]>(INITIAL_BUGS);
  const totalPoints = useMemo(
    () => bugs.filter((b) => b.status === "approved").length,
    [bugs],
  );

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const onSaveProfile = () => {
    setUser((u) => ({ ...u, name, email }));
  };

  const onEditRecord = (r: RecordItem) => {
    setEditingId(r.id);
    setSeasonDraft(r.season);
    setEpisodeDraft(r.episode);
  };

  const onSaveRecord = (id: string) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, season: seasonDraft, episode: episodeDraft } : r,
      ),
    );
    setEditingId(null);
  };

  const avatarClick = () => fileRef.current?.click();
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setUser((u) => ({ ...u, photoUrl: url }));
  };

  const logout = () => {
    navigate("/", { replace: true });
  };

  const withdraw = () => {
    navigate("/", { replace: true });
  };

  return (
    <section className="w-full mx-auto">
      <div className="mb-6 rounded-2xl bg-bg-white p-6 shadow-card">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={avatarClick}
              className="relative h-16 w-16 overflow-hidden rounded-full border border-brand-tertiary"
              aria-label="프로필 사진 변경"
              title="프로필 사진 변경"
            >
              <img
                src={user.photoUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              className="hidden"
              onChange={handleFile}
            />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-gray-900">
                  {user.name}
                </p>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                  {totalPoints} BUG
                </span>
              </div>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>

          <Button
            text="로그아웃"
            size="md"
            leftIconSrc={Logout}
            onClick={() => setLogoutOpen(true)}
          />
        </div>
      </div>
      <div className="mb-6 flex gap-3">
        <Button
          text="프로필"
          size="md"
          leftIconSrc={tab === "profile" ? ProfileWhite : Profile}
          selected={tab === "profile"}
          onClick={() => setTab("profile")}
        />
        <Button
          text="시청 기록"
          size="md"
          leftIconSrc={tab === "records" ? TVWhite : TVBlack}
          selected={tab === "records"}
          onClick={() => setTab("records")}
        />
        <Button
          text="버그 발견"
          size="md"
          leftIconSrc={tab === "bugs" ? BugWhite : Bug}
          selected={tab === "bugs"}
          onClick={() => setTab("bugs")}
        />
      </div>
      {tab === "profile" && (
        <div className="rounded-2xl bg-bg-white p-6 shadow-card">
          <h4 className="mb-4 text-base font-semibold text-gray-900">
            프로필 정보
          </h4>

          <div className="mb-4">
            <label className="mb-1 block text-sm text-gray-700">이름</label>
            <input
              className="h-12 w-full rounded-xl border border-brand-tertiary bg-bg-white px-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm text-gray-700">이메일</label>
            <input
              className="h-12 w-full rounded-xl border border-brand-tertiary bg-bg-white px-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
            />
          </div>

          <div className="flex gap-3">
            <Button
              text="저장하기"
              size="md"
              leftIconSrc={Save}
              selected
              onClick={onSaveProfile}
            />
            <button
              onClick={() => setWithdrawOpen(true)}
              className="ml-auto inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-100"
            >
              <img src={Trash} alt="" className="h-4 w-4" />
              계정 탈퇴하기
            </button>
          </div>
        </div>
      )}

      {tab === "records" && (
        <div className="rounded-2xl bg-bg-white p-6 shadow-card">
          <h4 className="mb-4 text-base font-semibold text-gray-900">
            시청 기록
          </h4>

          <div className="space-y-4">
            {records.map((r) => {
              const editing = editingId === r.id;
              return (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-brand-tertiary bg-bg-white p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-xl">
                      <img
                        src={r.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{r.title}</p>

                      {!editing ? (
                        <>
                          <p className="text-sm text-gray-600">
                            시즌 {r.season}, {r.episode}화
                          </p>
                          <p className="text-xs text-gray-500">{r.date}</p>
                        </>
                      ) : (
                        <div className="mt-2 flex items-center gap-3">
                          <div>
                            <p className="mb-1 text-xs text-gray-600">시즌</p>
                            <input
                              type="number"
                              className="h-10 w-24 rounded-lg border border-brand-tertiary bg-bg-white px-3 text-sm"
                              value={seasonDraft}
                              onChange={(e) =>
                                setSeasonDraft(Number(e.target.value))
                              }
                            />
                          </div>
                          <div>
                            <p className="mb-1 text-xs text-gray-600">
                              에피소드
                            </p>
                            <input
                              type="number"
                              className="h-10 w-24 rounded-lg border border-brand-tertiary bg-bg-white px-3 text-sm"
                              value={episodeDraft}
                              onChange={(e) =>
                                setEpisodeDraft(Number(e.target.value))
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {!editing ? (
                    <Button
                      key={`edit-${r.id}`}
                      text="수정"
                      size="sm"
                      leftIconSrc={Edit}
                      onClick={() => onEditRecord(r)}
                    />
                  ) : (
                    <Button
                      key={`save-${r.id}`}
                      text="저장"
                      size="sm"
                      leftIconSrc={Save}
                      selected
                      onClick={() => onSaveRecord(r.id)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "bugs" && (
        <div className="rounded-2xl bg-bg-white p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-base font-semibold text-gray-900">
              버그 발견 리스트
            </h4>
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              <img src={BugGreen} alt="" className="h-4 w-4" />
              누적 포인트 : {totalPoints}
            </div>
          </div>

          <div className="space-y-4">
            {bugs.map((b) => {
              const stateStyle =
                b.status === "approved"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : b.status === "pending"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : "bg-red-50 text-red-700 border-red-200";
              const stateText =
                b.status === "approved"
                  ? "승인됨"
                  : b.status === "pending"
                  ? "대기중"
                  : "거절됨";

              return (
                <div
                  key={b.id}
                  className="rounded-xl border border-brand-tertiary bg-bg-white p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs text-gray-500">{b.date}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${stateStyle}`}
                    >
                      {stateText}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800">{b.content}</p>
                  {b.status === "approved" && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                      <img src={BugGreen} alt="" className="h-4 w-4" />
                      +1 BUG 획득
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <ConfirmModal
        open={logoutOpen}
        title="로그아웃 하시겠어요?"
        description="확인을 누르면 로그아웃되고 랜딩 페이지로 이동합니다."
        confirmText="로그아웃"
        onConfirm={logout}
        onClose={() => setLogoutOpen(false)}
      />
      <ConfirmModal
        open={withdrawOpen}
        title="계정을 탈퇴하시겠어요?"
        description="계정 탈퇴는 되돌릴 수 없습니다."
        confirmText="탈퇴하기"
        onConfirm={withdraw}
        onClose={() => setWithdrawOpen(false)}
      />
    </section>
  );
}
