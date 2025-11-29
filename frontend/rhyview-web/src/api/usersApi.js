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

// ✅ 4. 찜 목록 조회 (데이터 가공)
export const getUserFavorites = async (token) => {
  try {
    const res = await axios.get(`${API_BASE}/users/favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // 백엔드 응답이 [{show_id: 1, venue_id: null}, {show_id: null, venue_id: 2}] 형태라고 가정
    const rawData = res.data.data || [];
    
    // "show-1", "venue-2" 형태로 변환해서 반환
    return rawData.map(item => {
        if (item.show_id) return `show-${item.show_id}`;
        if (item.venue_id) return `venue-${item.venue_id}`;
        return null; // 알 수 없는 데이터
    }).filter(Boolean); // null 제거

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

// ✅ 6. 찜 삭제 (타입 구분)
export const removeFavorite = async (id, type, token) => {
  try {
    // 삭제 시에도 type 정보를 쿼리스트링이나 body로 보내면 좋음 (백엔드 지원 여부에 따라 다름)
    // 여기서는 일단 URL 파라미터로 id만 보내고, 필요시 백엔드가 처리하도록 함
    await axios.delete(`${API_BASE}/users/favorites/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { type } // DELETE 요청도 body를 가질 수 있음
    });
  } catch (error) {
    console.error("찜 삭제 실패:", error);
    throw error;
  }
};