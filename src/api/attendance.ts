import { api } from "./axios";

export interface TodayAttendance {
  id: number;
  workDate: string;
  checkIn: string;
  checkOut: string | null;
}

// 오늘 기록 조회 입니다. 
export const getTodayAttendance = async () => {
  const res = await api.get<TodayAttendance | null>("/api/attendance/today");
  return res.data;
};

// 출근 입니다. 
export const clockIn = async () => {
  await api.post("/api/attendance/check-in");
};

// 퇴근 입니다. 
export const clockOut = async () => {
  await api.post("/api/attendance/check-out");
};

// 전체 기록 입니다. 
export const getMyAttendance = async () => {
  const res = await api.get("/api/attendance/my");
  return res.data;
};