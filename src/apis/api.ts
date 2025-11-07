import { isAxiosError } from "axios";
import { api } from "./axios";

export type ID = number;

export type Episode = {
  id: ID;
  season: ID;
  episode_number: number;
  episode_title: string;
  content?: string | null;
};

export type Genre = {
  id: ID;
  name: string;
};

export type Season = {
  id: ID;
  series: ID;
  season_number: number;
};

export type Series = {
  id: ID;
  title: string;
  photo?: string | null;
  description?: string | null;
  genres?: ID[];
};

export type Conversation = {
  id: ID;
  user: ID;
  series?: ID | null;
  summary?: string | null;
  created_at: string; // ISO
  qapairs?: QAPair[];
};

export type QAPair = {
  id: ID;
  conversation: ID;
  question_text: string;
  answer_text?: string | null;
  created_at: string; // ISO
};

export type TokenPair = {
  access: string;
  refresh: string;
};

function logApiError(label: string, e: unknown) {
  if (isAxiosError(e)) {
    console.error(`${label} error:`, e.response?.status, e.response?.data);
  } else {
    console.error(`${label} unknown error:`, e);
  }
}

export async function getEpisodes(params?: {
  season?: ID;
}): Promise<Episode[]> {
  try {
    const res = await api.get<Episode[]>("/episode/", { params });
    if (res.status === 200) return res.data;
  } catch (e) {
    logApiError("getEpisodes", e);
  }
  return [];
}

export async function getEpisode(id: ID | string): Promise<Episode | null> {
  try {
    const res = await api.get<Episode>(
      `/episode/${encodeURIComponent(String(id))}/`,
    );
    if (res.status === 200) return res.data;
  } catch (e) {
    logApiError("getEpisode", e);
  }
  return null;
}

export async function getGenres(): Promise<Genre[]> {
  try {
    const res = await api.get<Genre[]>("/genre/");
    if (res.status === 200) return res.data;
  } catch (e) {
    logApiError("getGenres", e);
  }
  return [];
}

export async function getGenre(id: ID | string): Promise<Genre | null> {
  try {
    const res = await api.get<Genre>(
      `/genre/${encodeURIComponent(String(id))}/`,
    );
    if (res.status === 200) return res.data;
  } catch (e) {
    logApiError("getGenre", e);
  }
  return null;
}

export async function getSeasons(params?: { series?: ID }): Promise<Season[]> {
  try {
    const res = await api.get<Season[]>("/season/", { params });
    if (res.status === 200) return res.data;
  } catch (e) {
    logApiError("getSeasons", e);
  }
  return [];
}

export async function getSeason(id: ID | string): Promise<Season | null> {
  try {
    const res = await api.get<Season>(
      `/season/${encodeURIComponent(String(id))}/`,
    );
    if (res.status === 200) return res.data;
  } catch (e) {
    logApiError("getSeason", e);
  }
  return null;
}

export async function getSeriesList(): Promise<Series[]> {
  try {
    const res = await api.get<Series[]>("/series/");
    if (res.status === 200) return res.data;
  } catch (e) {
    logApiError("getSeriesList", e);
  }
  return [];
}

export async function getSeriesDetail(id: ID | string): Promise<Series | null> {
  try {
    const res = await api.get<Series>(
      `/series/${encodeURIComponent(String(id))}/`,
    );
    if (res.status === 200) return res.data;
  } catch (e) {
    logApiError("getSeriesDetail", e);
  }
  return null;
}

export async function getConversations(): Promise<Conversation[]> {
  try {
    const res = await api.get<Conversation[]>("/series-chat/");
    if (res.status === 200) return res.data;
  } catch (e) {
    logApiError("getConversations", e);
  }
  return [];
}

export async function createConversation(payload: {
  summary?: string;
  series?: ID | null;
}): Promise<Conversation | null> {
  try {
    const res = await api.post<Conversation>("/series-chat/", payload);
    if (res.status === 201 || res.status === 200) return res.data;
  } catch (e) {
    logApiError("createConversation", e);
  }
  return null;
}

export async function getQAPairs(
  conversationId: ID | string,
): Promise<QAPair[]> {
  try {
    const res = await api.get<QAPair[]>(
      `/series-chat/${encodeURIComponent(String(conversationId))}/qapairs/`,
    );
    if (res.status === 200) return res.data;
  } catch (e) {
    logApiError("getQAPairs", e);
  }
  return [];
}

export async function createQAPair(
  conversationId: ID | string,
  payload: { question: string; summary?: string },
): Promise<QAPair | null> {
  try {
    const res = await api.post<QAPair>(
      `/series-chat/${encodeURIComponent(String(conversationId))}/qapairs/`,
      payload,
    );
    if (res.status === 201 || res.status === 200) return res.data;
  } catch (e) {
    logApiError("createQAPair", e);
  }
  return null;
}

export async function loginWithPassword(payload: {
  username: string;
  password: string;
}): Promise<TokenPair | null> {
  try {
    const res = await api.post<TokenPair>("/user/login/", payload);
    if (res.status === 201 || res.status === 200) return res.data;
  } catch (e) {
    logApiError("loginWithPassword", e);
  }
  return null;
}

export async function logout(): Promise<boolean> {
  try {
    const res = await api.post("/user/logout/");
    return res.status === 201 || res.status === 200;
  } catch (e) {
    logApiError("logout", e);
    return false;
  }
}

export async function registerUser(payload: {
  username: string;
  password: string;
  email?: string;
}): Promise<boolean> {
  try {
    const res = await api.post("/user/register/", payload);
    return res.status === 201 || res.status === 200;
  } catch (e) {
    logApiError("registerUser", e);
    return false;
  }
}

export type JsonObject = Record<string, unknown>;

export async function getSocialAccount(): Promise<JsonObject | null> {
  try {
    const res = await api.get("/user/social/account/");
    if (res.status === 200) return res.data as JsonObject;
  } catch (e) {
    logApiError("getSocialAccount", e);
  }
  return null;
}

export async function unlinkSocialAccount(): Promise<boolean> {
  try {
    const res = await api.delete("/user/social/account/");
    return res.status === 204 || res.status === 200;
  } catch (e) {
    logApiError("unlinkSocialAccount", e);
    return false;
  }
}

export function redirectToKakaoLogin(): void {
  const base = import.meta.env.VITE_API_BASE_URL as string;
  window.location.href = `${base}/api/user/kakao/login/`;
}

export async function kakaoSignIn(code: string): Promise<boolean> {
  try {
    const res = await api.get("/user/kakao/callback/", { params: { code } });
    if (res.status === 200) {
      localStorage.setItem("isLoggedIn", "true");
      return true;
    }
    return false;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      console.error("kakaoSignIn error:", e.response?.status, e.response?.data);
    } else {
      console.error("kakaoSignIn unknown error:", e);
    }
    return false;
  }
}

export async function kakaoCallback(code: string): Promise<boolean> {
  try {
    const res = await api.get("/user/kakao/callback/", { params: { code } });
    return res.status === 200;
  } catch (e) {
    logApiError("kakaoCallback", e);
    return false;
  }
}

export async function refreshAccessToken(): Promise<boolean> {
  try {
    const res = await api.post<{ access: string }>("/user/token/refresh/", {});
    return res.status === 200 || res.status === 201;
  } catch (e) {
    logApiError("refreshAccessToken", e);
    return false;
  }
}
