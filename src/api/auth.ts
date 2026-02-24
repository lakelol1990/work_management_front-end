import axios from "axios";

const BASE = "http://localhost:8182/api/auth"; 

export interface SignUpRequest {
  email: string;
  password: string;
}

export const signup = async (data: SignUpRequest) => {
  await axios.post(`${BASE}/register`, data);
};