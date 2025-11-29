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

// ✅ 4. 찜 목록 조회 (GET /users/favorites)
export const getUserFavorites = async (token) => {
  try {
    const res = await axios.get(`${API_BASE}/users/favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // 백엔드 응답이 { data: [...] } 또는 { favorites: [...] } 일 수 있음
    return res.data.data || res.data.favorites || [];
  } catch (error) {
    console.error("찜 목록 조회 실패:", error);
    return [];
  }
};

// ✅ 5. 찜 추가 (POST /users/favorites/:id)
export const addFavorite = async (id, type, token) => {
  try {
    // API 명세서에 따르면 ID는 URL 파라미터로 보냅니다.
    // (혹시 백엔드가 type 구분을 위해 body를 필요로 할 수 있어 body에도 넣습니다)
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

// ✅ 6. 찜 삭제 (DELETE /users/favorites/:id)
export const removeFavorite = async (id, type, token) => {
  try {
    // DELETE 요청
    await axios.delete(`${API_BASE}/users/favorites/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { type } // DELETE에서 body를 보낼 땐 data 속성 사용
    });
  } catch (error) {
    console.error("찜 삭제 실패:", error);
    throw error;
  }
};