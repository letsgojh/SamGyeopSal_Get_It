import axios from 'axios';

// 백엔드 기본 주소
export const API_BASE = "http://localhost:3000";

// 1. 공연장별 좌석 목록 조회
export const getSeats = async (venueId) => {
  try {
    // 🚨 수정됨: 기존 /seats/venue/:id -> /seats/shows/:id/seats 로 변경
    // (백엔드 seatRouter.js와 app.js 설정을 따름)
    const res = await axios.get(`${API_BASE}/seats/shows/${venueId}/seats`);
    
    // 데이터 구조가 { data: rows } 인지 확인 후 반환
    if (res.data && res.data.data) {
        return res.data.data;
    }
    return [];
  } catch (error) {
    console.error("좌석 데이터 조회 실패:", error);
    return [];
  }
};

// 2. 좌석별 리뷰 조회
export const getSeatReviews = async (showId, seatId) => {
  try {
    // 🚨 수정됨: 주소 패턴 통일
    const res = await axios.get(`${API_BASE}/seats/shows/${showId}/seats/${seatId}/reviews`);
    if (res.data && res.data.data) {
        return res.data.data;
    }
    return [];
  } catch (error) {
    console.error("좌석 리뷰 조회 실패:", error);
    return [];
  }
};

// 3. 좌석 리뷰 작성
export const createReview = async (showId, reviewData, token) => {
  try {
    // 🚨 수정됨: 주소 패턴 통일
    const res = await axios.post(
      `${API_BASE}/seats/shows/${showId}/reviews`,
      reviewData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return res.data;
  } catch (error) {
    console.error("리뷰 작성 실패:", error);
    throw error;
  }
};