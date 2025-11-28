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

// 3. 회원가입 함수
export const signupUser = async (userData) => {
  // userData = { name, email, password }
  try {
    const res = await axios.post(`${API_BASE}/users/signup`, userData);
    return res.data;
  } catch (error) {
    // 에러 메시지를 백엔드에서 받아와서 던짐
    const message = error.response?.data?.message || "회원가입에 실패했습니다.";
    throw new Error(message);
  }
};