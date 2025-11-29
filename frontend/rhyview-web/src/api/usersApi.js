import axios from 'axios';

export const API_BASE = "http://localhost:3000";

// 1. 로그인
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE}/users/login`, { email, password });
  return res.data;
};

// 2. 내 정보 조회
export const getUserInfo = async (token) => {
  try {
    const res = await axios.get(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.user || res.data;
  } catch (error) {
    return null;
  }
};

// 3. 회원가입
export const signupUser = async (userData) => {
  try {
    const res = await axios.post(`${API_BASE}/users/signup`, userData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "회원가입 실패");
  }
};

export const getUserFavorites = async (token) => {
  try {
    const res = await axios.get(`${API_BASE}/users/favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // 🔥 백엔드가 shows 객체를 그대로 주므로, 그대로 리턴해야 Favorites.jsx에서 작동함
    return res.data.data || [];

  } catch (error) {
    console.error("찜 목록 조회 실패:", error);
    return [];
  }
};



// ✅ 5. 찜 추가 (타입 구분)
export const addFavorite = async (id, type, token) => {
  try {
    // body에 type을 실어서 보냅니다.
    await axios.post(
      `${API_BASE}/users/favorites/${id}`, 
      { type }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error("찜 추가 실패:", error);
    throw error;
  }
};

export const removeFavorite = async (id, token) => {
  try {
    await axios.delete(`${API_BASE}/users/favorites/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error("찜 삭제 실패:", error);
    throw error;
  }
};

