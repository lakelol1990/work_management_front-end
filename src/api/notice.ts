import { api } from "./axios";

export interface Notice {
  id: number;
  title: string;
  content?: string;
  createdAt: string;
}

export const getNotices = async () => {
  const res = await api.get("/api/notices");
  return res.data;
};

export const getNotice = async (id: number) => {
  const res = await api.get(`/api/notices/${id}`);
  return res.data;
};






