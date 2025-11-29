import axios from 'axios';

// ✅ 서버 주소 (공통)
export const API_BASE = "http://localhost:3000"; 

// 1. 전체 공연장 목록 조회 (Home.jsx에서 사용)
export const getVenues = async () => {
  try {
    const res = await axios.get(`${API_BASE}/venues/`);
    console.log("📦 공연장 목록 응답:", res.data);

    // 데이터 구조 { data: [...] } 처리
    if (res.data && Array.isArray(res.data.data)) return res.data.data;
    if (Array.isArray(res.data)) return res.data;
    
    return [];
  } catch (error) {
    console.error("공연장 목록 조회 실패:", error);
    return [];
  }
};

// 2. 특정 공연장 상세 조회 (단건 조회 - 상세페이지용)
export const getVenueById = async (venueId) => {
  try {
    const res = await axios.get(`${API_BASE}/venues/${venueId}`);
    console.log(`📦 공연장 상세(ID:${venueId}) 응답:`, res.data);

    // 데이터 구조 처리
    if (res.data && res.data.data) return res.data.data; // 객체가 data 안에 있을 때
    if (res.data && Array.isArray(res.data.data)) return res.data.data[0]; // 배열로 오면 첫번째
    
    return res.data;
  } catch (error) {
    console.error(`공연장 상세 조회 실패(ID:${venueId}):`, error);
    return null;
  }
};