import axios from 'axios';

export const API_BASE = "http://localhost:3000";

// 1. 로그인
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE}/users/login`, { email, password });
  return res.data; 
};

// 2. 내 정보 조회 (토큰 사용)
export const getUserInfo = async (token) => {
  try {
    const res = await axios.get(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.user || res.data; 
  } catch (error) {
    console.error("내 정보 조회 실패:", error);
    return null;
  }
};